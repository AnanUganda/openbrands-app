/**
 * One-off cleanup: delete the leftover `project` and `template` documents that
 * predate the move to a single `portfolio` collection.
 *
 * These never appeared on the public site (the work page only queries
 * `portfolio`) and the redeployed Studio has no list for them either.
 *
 * Take a dataset export before running this:
 *   cd studio && npx sanity dataset export production ../backup.tar.gz
 *
 * Dry run (default, writes nothing):
 *   node scripts/delete-legacy-project-template-docs.mjs
 *
 * Apply:
 *   node scripts/delete-legacy-project-template-docs.mjs --apply
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createClient } from '@sanity/client'

const APPLY = process.argv.includes('--apply')

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
  console.error('--apply needs a token. Run `npx sanity login` in ./studio, or set SANITY_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: 'j94msrpk',
  dataset: 'production',
  apiVersion: '2024-05-11',
  useCdn: false,
  token: token ?? undefined,
})

async function main() {
  const docs = await client.fetch(
    `*[_type in ["project","template"]]{_id, _type, title, "slug": slug.current}`
  )

  if (!docs.length) {
    console.log('Nothing to delete — no project/template documents remain.')
    return
  }

  console.log(`${APPLY ? 'DELETING' : 'DRY RUN —'} ${docs.length} legacy documents:\n`)
  docs.forEach((d) => console.log(`  ${d._type.padEnd(9)} ${d.title}  (${d._id})`))
  console.log()

  if (!APPLY) {
    console.log('Nothing written. Re-run with --apply to delete.')
    return
  }

  // Guard: never touch anything that is not one of these two legacy types.
  const ids = docs
    .filter((d) => d._type === 'project' || d._type === 'template')
    .flatMap((d) => [d._id, `drafts.${d._id}`])

  let tx = client.transaction()
  ids.forEach((id) => {
    tx = tx.delete(id)
  })
  await tx.commit()

  const remaining = await client.fetch(`count(*[_type in ["project","template"]])`)
  const portfolio = await client.fetch(`count(*[_type == "portfolio"])`)
  console.log(`Deleted. project/template remaining: ${remaining}. portfolio documents: ${portfolio}.`)
}

main().catch((err) => {
  console.error('\nFailed:', err.message)
  process.exit(1)
})
