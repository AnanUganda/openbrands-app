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

const SANITY_QUERY_URL =
  'https://j94msrpk.apicdn.sanity.io/v2024-05-11/data/query/production?query=' +
  encodeURIComponent(
    '*[_type in ["post","portfolio"] && defined(slug.current)]{_type, "slug": slug.current, title}'
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
  const titlesByRoute = new Map();

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(SANITY_QUERY_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.result) && data.result.length > 0) {
          for (const item of data.result) {
            if (item._type === 'post' && item.slug) {
              const route = `/blog/${item.slug}`;
              routes.add(route);
              if (item.title) {
                titlesByRoute.set(route, `${item.title.replace(/\n/g, ' ').trim()} | Open Brands`);
              }
            } else if (item._type === 'portfolio' && item.slug) {
              const route = `/portfolio/${item.slug}`;
              routes.add(route);
              if (item.title) {
                titlesByRoute.set(route, `${item.title.replace(/\n/g, ' ').trim()} | Open Brands Portfolio`);
              }
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

  return { routes: Array.from(routes), titlesByRoute };
}

async function startServer() {
  const handler = sirv(distDir, { single: true, dev: true });
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

  const { routes, titlesByRoute } = await getRoutes();
  console.log(`Discovered ${routes.length} routes to prerender:\n${routes.map((r) => `  • ${r}`).join('\n')}\n`);

  const { server, port } = await startServer();
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

      // Resolve proper page title (handling react-helmet-async React 19 array child behavior if needed)
      const expectedTitle = titlesByRoute.get(route);
      await page.evaluate((expected) => {
        const titleEls = Array.from(document.querySelectorAll('head > title'));
        let activeTitle = document.title;

        // If react-helmet-async inserted an empty title or title is missing, fix it
        if (!activeTitle || activeTitle.trim() === '') {
          if (expected) {
            document.title = expected;
            activeTitle = expected;
          }
        }

        // Clean up redundant duplicate or empty title tags from index.html template
        if (titleEls.length > 1) {
          let kept = false;
          for (const el of titleEls) {
            if (!kept && el.textContent.trim() === activeTitle.trim() && activeTitle.trim() !== '') {
              kept = true;
            } else if (!kept && el.textContent.trim() !== '') {
              el.textContent = activeTitle;
              kept = true;
            } else {
              el.remove();
            }
          }
        }
      }, expectedTitle);

      const capturedTitle = await page.evaluate(() => document.title);
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

      if (route === '/') {
        homeTitle = capturedTitle;
      } else {
        // Validation checks
        if (capturedTitle === homeTitle && !route.startsWith('/portfolio/') && !route.startsWith('/blog/')) {
          console.warn(`⚠️ Warning: Route ${route} has title identical to homepage ("${homeTitle}")`);
        }
        if (visibleTextLength < 250) {
          console.error(`❌ Error: Route ${route} has under 250 chars of visible text (${visibleTextLength} chars)`);
          hasFailure = true;
        }
      }
    }
  } finally {
    if (browser) await browser.close();
    server.close();
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
