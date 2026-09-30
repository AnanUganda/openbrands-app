/**
 * Minimal Supabase REST helper.
 *
 * Uses PostgREST directly rather than @supabase/supabase-js so the serverless
 * functions stay dependency-free, matching how Notion and Resend are called.
 *
 * Requires two environment variables (set them in Vercel > Settings > Environment
 * Variables, and in .env.local for `vercel dev`):
 *   SUPABASE_URL              e.g. https://abcdefgh.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY the service role key — server-side only, never
 *                             expose it to the browser or prefix it with VITE_
 */

export const supabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

interface InsertOptions {
  /** Column to resolve conflicts on, e.g. "email". Turns the insert into an upsert. */
  onConflict?: string;
}

/**
 * Inserts one row into `table`. Throws on a non-2xx response so callers can log
 * it; every caller treats a failure as non-fatal for the form submission.
 */
export async function insertRow(
  table: string,
  row: Record<string, unknown>,
  options: InsertOptions = {}
): Promise<void> {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  const endpoint = new URL(`/rest/v1/${table}`, url);
  if (options.onConflict) {
    endpoint.searchParams.set("on_conflict", options.onConflict);
  }

  const prefer = options.onConflict
    ? "return=minimal,resolution=merge-duplicates"
    : "return=minimal";

  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: prefer,
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase insert into ${table} failed (${response.status}): ${detail}`);
  }
}
