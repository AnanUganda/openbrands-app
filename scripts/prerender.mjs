import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const tempSrcDir = path.join(rootDir, '.prerender-src');

const SANITY_QUERY_URL =
  'https://j94msrpk.apicdn.sanity.io/v2024-05-11/data/query/production?query=' +
  encodeURIComponent(
    '*[_type in ["post","portfolio"] && defined(slug.current)]{_type, "slug": slug.current}'
  );

const STATIC_ROUTES = ['/', '/contact', '/portfolio', '/blog', '/hiring'];

const FALLBACK_PORTFOLIO_SLUGS = [
  'oakline-landscaping',
  'urban-sheds',
  'sowers-harvest',
  'torify-financial',
  'reiff-design-build',
  'extend-cafes',
  'echo-kenya',
];

async function getRoutes() {
  const routes = new Set(STATIC_ROUTES);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(SANITY_QUERY_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.result) && data.result.length > 0) {
          for (const item of data.result) {
            if (item._type === 'post' && item.slug) {
              routes.add(`/blog/${item.slug}`);
            } else if (item._type === 'portfolio' && item.slug) {
              routes.add(`/portfolio/${item.slug}`);
            }
          }
          break;
        }
      }
    } catch (err) {
      if (attempt === 3) {
        console.warn('⚠️ Warning: Failed to fetch dynamic routes from Sanity after 3 attempts:', err.message);
      } else {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }

  // If no portfolio routes were discovered from Sanity, fallback to hardcoded list
  const hasPortfolioRoutes = Array.from(routes).some((r) => r.startsWith('/portfolio/'));
  if (!hasPortfolioRoutes) {
    for (const slug of FALLBACK_PORTFOLIO_SLUGS) {
      routes.add(`/portfolio/${slug}`);
    }
  }

  // Ensure /about is excluded (it redirects to /)
  routes.delete('/about');

  return Array.from(routes);
}

async function startServer(serveDir) {
  const handler = sirv(serveDir, { single: true, dev: true });
  const server = http.createServer((req, res) => handler(req, res));

  await new Promise((resolve, reject) => {
    server.listen(0, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 4173;
  return { server, port };
}

async function prerender() {
  console.log('🚀 Starting route prerendering with Headless Chromium...\n');

  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ directory not found. Please run vite build first.');
  }

  // Copy dist/ to clean immutable temp directory for serving during the crawl
  if (fs.existsSync(tempSrcDir)) {
    fs.rmSync(tempSrcDir, { recursive: true, force: true });
  }
  fs.cpSync(distDir, tempSrcDir, { recursive: true });

  const routes = await getRoutes();
  console.log(`Discovered ${routes.length} routes to prerender:\n${routes.map((r) => `  • ${r}`).join('\n')}\n`);

  const { server, port } = await startServer(tempSrcDir);
  const baseUrl = `http://localhost:${port}`;

  let browser;
  let homeTitle = '';
  let hasFailure = false;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for any async loading spinners (e.g. Sanity data fetching) to finish
      try {
        await page.waitForFunction(() => !document.querySelector('.animate-spin'), { timeout: 10000 });
      } catch {
        // Continue if timeout
      }

      // Smooth incremental scroll to trigger scroll-revealed content / animations
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 250;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 60);
        });
      });

      // Allow animations and Helmet DOM updates to settle
      await new Promise((r) => setTimeout(r, 600));

      // Deduplicate <head> tags: keep only the correct occurrence of each tag (react-helmet-async / React 19)
      await page.evaluate(() => {
        const head = document.head;
        const TEMPLATE_TITLE = 'Open Brands | Results-Driven B2B Marketing Agency';

        // 1. <title>: Resolve title from hoisted React element props if array children, then deduplicate
        const titleEls = Array.from(head.querySelectorAll('title'));
        for (const titleEl of titleEls) {
          const keys = Object.keys(titleEl);
          const reactPropsKey = keys.find((k) => k.startsWith('__reactProps$'));
          if (reactPropsKey && titleEl[reactPropsKey]?.children) {
            const rawChildren = titleEl[reactPropsKey].children;
            const resolvedTitle = Array.isArray(rawChildren) ? rawChildren.join('') : String(rawChildren);
            if (resolvedTitle.trim()) {
              titleEl.textContent = resolvedTitle.trim();
            }
          }
        }

        titleEls.filter((el) => el.textContent.trim() === '').forEach((el) => el.remove());

        const remainingTitleEls = Array.from(head.querySelectorAll('title'));
        if (remainingTitleEls.length > 1) {
          const pageTitleEl =
            remainingTitleEls.find((el) => el.textContent.trim() !== TEMPLATE_TITLE) || remainingTitleEls[0];
          remainingTitleEls.forEach((el) => {
            if (el !== pageTitleEl) el.remove();
          });
        }

        // 2. <meta name="description"> and <meta name="title">: keep only the LAST one
        for (const name of ['description', 'title']) {
          const metaEls = Array.from(head.querySelectorAll(`meta[name="${name}"]`));
          if (metaEls.length > 1) {
            metaEls.slice(0, -1).forEach((el) => el.remove());
          }
        }

        // 3. Every <meta property="og:*">: keep only the LAST one per property
        const ogProps = new Set();
        head.querySelectorAll('meta[property^="og:"]').forEach((el) => {
          const prop = el.getAttribute('property');
          if (prop) ogProps.add(prop);
        });
        for (const prop of ogProps) {
          const metaEls = Array.from(head.querySelectorAll(`meta[property="${prop}"]`));
          if (metaEls.length > 1) {
            metaEls.slice(0, -1).forEach((el) => el.remove());
          }
        }

        // 4. Every <meta name="twitter:*"> and <meta property="twitter:*">: keep only the LAST one
        const twProps = new Set();
        head.querySelectorAll('meta[name^="twitter:"], meta[property^="twitter:"]').forEach((el) => {
          const key = el.getAttribute('name') || el.getAttribute('property');
          if (key) twProps.add(key);
        });
        for (const key of twProps) {
          const metaEls = Array.from(
            head.querySelectorAll(`meta[name="${key}"], meta[property="${key}"]`)
          );
          if (metaEls.length > 1) {
            metaEls.slice(0, -1).forEach((el) => el.remove());
          }
        }
      });

      const capturedTitle = await page.evaluate(() => {
        const titleEl = document.head.querySelector('title');
        return (titleEl?.textContent || document.title || '').trim();
      });
      const visibleTextLength = await page.evaluate(() => (document.body.innerText || '').trim().length);
      const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);

      // Determine output file path
      const outPath =
        route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route.replace(/^\//, ''), 'index.html');

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf-8');

      const byteSize = Buffer.byteLength(html, 'utf-8');
      const relOutPath = path.relative(rootDir, outPath);

      console.log(
        `✓ [${relOutPath}] (${byteSize.toLocaleString()} bytes)\n` +
          `    Title: "${capturedTitle}"\n` +
          `    Visible text: ${visibleTextLength.toLocaleString()} chars`
      );

      if (!capturedTitle) {
        console.error(`❌ Error: Route ${route} rendered an empty <title>`);
        hasFailure = true;
      } else if (route === '/') {
        homeTitle = capturedTitle;
      } else {
        // Validation checks
        if (capturedTitle === homeTitle) {
          console.error(`❌ Error: Route ${route} has title identical to homepage ("${homeTitle}")`);
          hasFailure = true;
        }
        if (visibleTextLength < 1000) {
          console.error(`❌ Error: Route ${route} has under 1,000 chars of visible text (${visibleTextLength} chars)`);
          hasFailure = true;
        }
      }
    }
  } finally {
    if (browser) await browser.close();
    if (server) server.close();
    if (fs.existsSync(tempSrcDir)) {
      try {
        fs.rmSync(tempSrcDir, { recursive: true, force: true });
      } catch (err) {
        console.warn('⚠️ Warning: Failed to clean up .prerender-src:', err.message);
      }
    }
  }

  if (hasFailure) {
    console.error('\n❌ Prerender validation failed for one or more routes.');
    process.exit(1);
  }

  console.log(`\n🎉 Successfully prerendered ${routes.length} routes!`);
}

prerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
