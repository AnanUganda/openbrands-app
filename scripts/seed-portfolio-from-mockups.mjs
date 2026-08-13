/**
 * Seed the `portfolio` collection in Sanity from the mockup PNGs in
 * public/Website Mockups Projects/.
 *
 * For each project it uploads the mockup as an image asset and creates (or
 * replaces) a published `portfolio` document with a deterministic _id, so the
 * script is safe to re-run — it updates in place rather than duplicating.
 *
 * Dry run (default, writes nothing):
 *   node scripts/seed-portfolio-from-mockups.mjs
 *
 * Apply:
 *   node scripts/seed-portfolio-from-mockups.mjs --apply
 *
 * Auth: uses SANITY_WRITE_TOKEN if set, otherwise falls back to the token the
 * Sanity CLI stored in ~/.config/sanity/config.json (`sanity login`).
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const APPLY = process.argv.includes('--apply')
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APP_ROOT = path.resolve(__dirname, '..')
const MOCKUP_ROOT = path.join(APP_ROOT, 'public', 'Website Mockups Projects')

function resolveToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN
  const cliConfig = path.join(os.homedir(), '.config', 'sanity', 'config.json')
  if (fs.existsSync(cliConfig)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(cliConfig, 'utf8'))
      if (parsed.authToken) return parsed.authToken
    } catch {
      /* fall through */
    }
  }
  return null
}

const token = resolveToken()
if (APPLY && !token) {
  console.error(
    '--apply needs a token. Either run `npx sanity login` in ./studio, or set\n' +
      'SANITY_WRITE_TOKEN=sk... (sanity.io/manage -> project j94msrpk -> API -> Tokens, Editor role).'
  )
  process.exit(1)
}

const client = createClient({
  projectId: 'j94msrpk',
  dataset: 'production',
  apiVersion: '2024-05-11',
  useCdn: false,
  token: token ?? undefined,
})

/** Portable Text helper — one paragraph per string. */
const body = (...paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `b${i}s0`, text, marks: [] }],
  }))

/**
 * Copy is written from the mockups themselves. `metrics` is deliberately left
 * empty — fill in real numbers per project in the Studio rather than shipping
 * invented performance claims about real businesses.
 */
const PROJECTS = [
  {
    slug: 'oakline-landscaping',
    file: 'Oakline/Oakline Landscaping_.png',
    title: 'Oakline Landscaping Design & Booking Site',
    clientName: 'Oakline Landscaping',
    category: 'Landscaping & Outdoor Living',
    tagline:
      'A consultation-first site for a master-crafted landscape studio, built around portfolio proof and easy booking.',
    techLabel: 'React + Vite',
    liveUrl: 'https://oakline-two.vercel.app',
    featured: true,
    highlights: [
      'Consultation booking as the primary call to action',
      'Service and portfolio sections that carry the sales story',
      'Editorial layout tuned for premium residential work',
      'Fast, image-heavy pages without the bloat',
    ],
    description: body(
      'Oakline needed a site that felt as considered as the gardens they build. We led with full-bleed project photography, then structured the page so every scroll depth has a route back to “Book a Consultation”.',
      'Service pages, a project portfolio and a clear process section do the qualifying work before a homeowner ever picks up the phone, so the consultations that land are already warm.'
    ),
  },
  {
    slug: 'urban-sheds',
    file: 'Urban Sheds /Urban Sheds Mock Up.png',
    title: 'Urban Sheds Backyard Office Configurator',
    clientName: 'Urban Sheds',
    category: 'Home Structures',
    tagline:
      'Sheds and backyard offices merchandised with a design-and-price flow that turns browsers into quote requests.',
    techLabel: 'React + Vite',
    highlights: [
      '“Design & Price” entry point above the fold',
      'Model catalogue organised by use case',
      'Location and gallery pages built for local search',
      'Quote capture wired straight into the sales inbox',
    ],
    description: body(
      'Urban Sheds sells a considered purchase, so the site is built to carry a visitor from idle curiosity to a configured quote in one session.',
      'The hero puts “Design & Price” next to the showroom imagery, and the model, gallery and location pages give search traffic somewhere specific to land.'
    ),
  },
  {
    slug: 'sowers-harvest-cafe',
    file: 'Sowers Harvest Cafe/410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png',
    title: 'Sowers Harvest Café Brand Site',
    clientName: 'Sowers Harvest Café',
    category: 'Hospitality & Dining',
    tagline:
      'A warm café site pairing menu, events and hiring with mailing-list capture front and centre.',
    techLabel: 'React + Vite',
    featured: true,
    highlights: [
      'Coffee, cuisine and conversation carried by the photography',
      'Events and hiring pages built in from the start',
      'Mailing-list signup pinned in the navigation',
      'Google and Instagram social proof surfaced on the homepage',
    ],
    description: body(
      '“Coffee. Cuisine. Conversation.” — the whole site is arranged around that promise, with room photography and food styling doing most of the persuading.',
      'Beyond the menu, the build covers the things a neighbourhood café actually runs on: events, hiring, café info, and a mailing list that keeps regulars coming back.'
    ),
  },
  {
    slug: 'extend-cafes',
    file: 'Extend Cafes/Extend Cafes Mockup_.png',
    title: 'Extend Cafés Multi-Location Alliance Site',
    clientName: 'Extend Cafés',
    category: 'Hospitality & Dining',
    tagline:
      'One brand home for an alliance of cafés — locations, products, events and resources under a single roof.',
    techLabel: 'React + Vite',
    liveUrl: 'https://extendcafes.com',
    highlights: [
      'Navigation that scales across every café in the alliance',
      'Products, events and resources sections kept distinct',
      'Workshop announcements promoted site-wide',
      'Editorial type treatment matching the print brand',
    ],
    description: body(
      'Extend Cafés is an alliance rather than a single shop, so the information architecture had to hold several cafés, a product line, events and a resource library without turning into a directory.',
      'The homepage leads with the mission — “Extend your table. Extend the Kingdom.” — and lets the café grid, workshops bar and subscribe action handle the rest.'
    ),
  },
  {
    slug: 'reiff-design-build',
    file: 'Reiff Design Build /410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png',
    title: 'Reiff Design Build Remodeling Platform',
    clientName: 'Reiff Design Build',
    category: 'Home Renovation & Remodeling',
    tagline:
      'A design-build remodeler site structured around service pages and free-consultation capture.',
    techLabel: 'React + Vite',
    highlights: [
      'Dedicated pages for full remodels, kitchens, bathrooms and basements',
      'Contact bar with direct phone and email in the header',
      'Trust section covering reliability, punctuality and craft',
      'Project gallery and blog for local search coverage',
    ],
    description: body(
      'Reiff Design Build competes on trust, so the site opens on finished interiors and “Design. Build. Transform.”, then immediately offers a free consultation.',
      'Each service — full remodel, kitchens, bathrooms, basements — gets its own page, and the trust block spells out reliability, punctuality and quality in the owner’s own language.'
    ),
  },
  {
    slug: 'torify',
    file: 'Torify/Torify website.png',
    title: 'Torify Adventure Travel Booking Experience',
    clientName: 'Torify',
    category: 'Travel & Experiences',
    tagline:
      'An adventure travel site built to move visitors from inspiration to “choose your adventure”.',
    techLabel: 'React + Vite',
    highlights: [
      'Destination-led hero with booking always in reach',
      '“Choose Your Adventure” browsing built around trip type',
      'Imagery-first layout that sells the destination',
      'Mobile-first flow for travellers researching on the go',
    ],
    description: body(
      'Travel converts on desire first and logistics second, so Torify opens on destination photography and a single line of positioning: ditch the ordinary, explore the extraordinary.',
      'From there the “Choose Your Adventure” section sorts trips into the shapes people actually shop for, keeping the booking action within reach at every step.'
    ),
  },
  {
    slug: 'echo-kenya',
    file: 'Echo Kenya/Eco Kenya.png',
    title: 'ECHO Trips Kenya Mission Trip Site',
    clientName: 'ECHO Trips',
    category: 'Nonprofit & Missions',
    tagline:
      'A mission-trip landing experience that leads with story and a clear path to join a trip.',
    techLabel: 'React + Vite',
    highlights: [
      'Full-bleed team photography as the emotional hook',
      '“Join a Trip” action repeated through the journey',
      'Itinerary and story pages that answer objections in order',
      'Built for sharing across church and campus networks',
    ],
    description: body(
      'ECHO Trips sells a decision, not a product, so the homepage gives the whole pitch in one frame: a team on the ground in Kenya, and one invitation — join a life-changing mission trip.',
      'Our Story, Itinerary and Contact then answer the practical questions in the order prospective travellers ask them, with “Join a Trip” never more than a click away.'
    ),
  },
]

async function main() {
  console.log(
    `${APPLY ? 'APPLYING' : 'DRY RUN'} — ${PROJECTS.length} portfolio documents for j94msrpk/production\n`
  )

  const missing = PROJECTS.filter((p) => !fs.existsSync(path.join(MOCKUP_ROOT, p.file)))
  if (missing.length) {
    console.error('Missing mockup files:')
    missing.forEach((p) => console.error(`  - ${p.file}`))
    process.exit(1)
  }

  const now = Date.now()

  for (const [i, project] of PROJECTS.entries()) {
    const filePath = path.join(MOCKUP_ROOT, project.file)
    const sizeMb = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1)
    const docId = `portfolio-${project.slug}`

    if (!APPLY) {
      console.log(`[dry] ${docId}`)
      console.log(`      image: ${project.file} (${sizeMb} MB)`)
      console.log(`      title: ${project.title}`)
      console.log(`      category: ${project.category}\n`)
      continue
    }

    process.stdout.write(`Uploading ${project.file} (${sizeMb} MB)... `)
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(project.file),
      title: `${project.clientName} website mockup`,
    })
    process.stdout.write(`ok\n`)

    // Stagger publishedAt so "featured desc, publishedAt desc" gives a stable order.
    const publishedAt = new Date(now - i * 86400000).toISOString()

    await client.createOrReplace({
      _id: docId,
      _type: 'portfolio',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      clientName: project.clientName,
      category: project.category,
      tagline: project.tagline,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
      description: project.description,
      highlights: project.highlights,
      techLabel: project.techLabel,
      ...(project.liveUrl ? { liveUrl: project.liveUrl } : {}),
      featured: Boolean(project.featured),
      publishedAt,
    })

    console.log(`Created ${docId}\n`)
  }

  if (!APPLY) {
    console.log('Nothing written. Re-run with --apply to upload.')
  } else {
    console.log(
      'Done. Check https://www.sanity.io/@o7y7amJNn/studio/p84d0svjiscgtxf4i70k5fk6\n' +
        '(or run `npm run dev` in ./studio for the local Studio on :3333).'
    )
  }
}

main().catch((err) => {
  console.error('\nFailed:', err.message)
  process.exit(1)
})
