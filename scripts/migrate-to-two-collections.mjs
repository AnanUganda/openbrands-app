/**
 * One-off migration: collapse the Sanity dataset down to two collections.
 *
 *   project  ─┐
 *             ├─> portfolio   (same _id, so nothing that points at these breaks)
 *   template ─┘
 *
 *   author   ─┐
 *             ├─> inlined onto post, then deleted
 *   category ─┘
 *
 * Dry run (default, writes nothing):
 *   node scripts/migrate-to-two-collections.mjs
 *
 * Apply:
 *   SANITY_WRITE_TOKEN=sk... node scripts/migrate-to-two-collections.mjs --apply
 *
 * Get a token at https://sanity.io/manage -> project j94msrpk -> API -> Tokens
 * (needs Editor/Deploy permissions). Back the dataset up first:
 *   cd studio && npx sanity dataset export production ../backup.tar.gz
 */
import { createClient } from '@sanity/client'

const APPLY = process.argv.includes('--apply')
const TOKEN = process.env.SANITY_WRITE_TOKEN

if (APPLY && !TOKEN) {
  console.error('--apply requires SANITY_WRITE_TOKEN to be set.')
  process.exit(1)
}

const client = createClient({
  projectId: 'j94msrpk',
  dataset: 'production',
  apiVersion: '2024-05-11',
  token: TOKEN,
  useCdn: false,
})

/** Strip system fields Sanity manages itself; they can't be written back. */
const stripSystem = (doc) => {
  const { _createdAt, _updatedAt, _rev, ...rest } = doc
  return rest
}

/** Drop keys whose value is undefined/null so we don't write empty fields. */
const compact = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null))

async function main() {
  console.log(APPLY ? '=== APPLYING MIGRATION ===\n' : '=== DRY RUN (no writes) ===\n')

  // Include drafts so unpublished edits migrate too.
  const [work, posts, authors, categories] = await Promise.all([
    client.fetch('*[_type in ["project", "template"]]'),
    client.fetch(`*[_type == "post"]{
      ...,
      "resolvedAuthorName": author->name,
      "resolvedAuthorImage": author->image,
      "resolvedCategories": categories[]->title
    }`),
    client.fetch('*[_type == "author"]{_id, name}'),
    client.fetch('*[_type == "category"]{_id, title}'),
  ])

  const tx = client.transaction()

  // ---- 1. project + template -> portfolio -------------------------------
  console.log(`Converting ${work.length} project/template docs -> portfolio:`)
  for (const doc of work) {
    const next = compact({
      ...stripSystem(doc),
      _type: 'portfolio',
      // `tagline` only existed on templates; projects get theirs from metrics context.
      tagline: doc.tagline,
      // Templates had no clientName; projects had no techLabel. Both are optional now.
      clientName: doc.clientName,
      techLabel: doc.techLabel,
      featured: doc.featured ?? false,
      publishedAt: doc.publishedAt || doc._createdAt,
    })

    // Retired store fields — the portfolio schema has no home for these.
    delete next.price
    delete next.isFree

    const dropped = ['price', 'isFree'].filter((k) => doc[k] !== undefined && doc[k] !== null)
    console.log(
      `  ${doc._type.padEnd(8)} -> portfolio  ${doc.title}` +
        (dropped.length ? `   (dropping ${dropped.join(', ')})` : '')
    )

    tx.createOrReplace(next)
  }

  // ---- 2. inline author + categories onto posts -------------------------
  console.log(`\nInlining author/categories on ${posts.length} posts:`)
  for (const post of posts) {
    const set = compact({
      authorName: post.resolvedAuthorName,
      authorImage: post.resolvedAuthorImage,
      categories: post.resolvedCategories?.filter(Boolean),
    })

    // `author` was a reference field and is gone from the schema. `categories` stays,
    // but as strings — so only unset it when there was nothing to resolve.
    const unset = ['author']
    if (!set.categories?.length) unset.push('categories')

    console.log(
      `  ${post.title}\n` +
        `      author     -> ${set.authorName || '(none)'}\n` +
        `      categories -> ${set.categories?.join(', ') || '(none)'}`
    )

    tx.patch(post._id, (p) => p.set(set).unset(unset))
  }

  // ---- 3. delete the retired collections ---------------------------------
  console.log(`\nDeleting ${authors.length} author + ${categories.length} category docs:`)
  for (const doc of [...authors, ...categories]) {
    console.log(`  ${doc._id}  ${doc.name || doc.title}`)
    tx.delete(doc._id)
  }

  if (!APPLY) {
    console.log('\nDry run complete. Nothing was written.')
    console.log('Re-run with --apply and SANITY_WRITE_TOKEN set to commit these changes.')
    return
  }

  await tx.commit()
  console.log('\nMigration committed.')

  const remaining = await client.fetch('*[!(_type match "sanity.*")]{_type} | order(_type)')
  const counts = remaining.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] || 0) + 1 }), {})
  console.log('Remaining document types:', counts)
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message)
  process.exit(1)
})
