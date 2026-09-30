type VercelRequest = any;
type VercelResponse = any;

// ---------------------------------------------------------------------------
// Supabase REST write.
//
// Inlined rather than imported from a shared module: Vercel does not bundle
// underscore-prefixed paths under api/, so importing one crashes the function
// at load time. Duplicated in api/lead.ts and api/subscribe.ts on purpose.
//
// Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-side only).
// ---------------------------------------------------------------------------
const supabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

async function insertRow(
  table: string,
  row: Record<string, unknown>,
  options: { onConflict?: string } = {}
): Promise<void> {
  const url = process.env.SUPABASE_URL as string;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

  const endpoint = new URL(`/rest/v1/${table}`, url);
  if (options.onConflict) {
    endpoint.searchParams.set("on_conflict", options.onConflict);
  }

  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: options.onConflict
        ? "return=minimal,resolution=merge-duplicates"
        : "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase insert into ${table} failed (${response.status}): ${detail}`);
  }
}


interface SubscribePayload {
  email: string;
  fax?: string; // Honeypot field
  source?: string;
  referrer?: string;
  utm?: Record<string, string>;
}

/** Stores blog newsletter signups. One row per address; re-subscribing updates it. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    if (res.setHeader) res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body: SubscribePayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { email = "", fax = "", source = "blog_newsletter", referrer = "", utm = {} } = body || {};

    // Honeypot: a filled hidden field means a bot, so accept and discard.
    if (fax && fax.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Subscribed" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    if (!supabaseConfigured()) {
      console.error("Supabase URL or service role key missing in process.env");
      return res.status(500).json({ error: "Subscriptions are not configured yet." });
    }

    await insertRow(
      "newsletter_subscribers",
      {
        email: trimmedEmail,
        source,
        referrer: referrer || null,
        utm: utm && Object.keys(utm).length > 0 ? utm : null,
      },
      { onConflict: "email" }
    );

    return res.status(200).json({ ok: true, message: "Subscribed" });
  } catch (error: any) {
    console.error("Subscribe Handler Error:", error);
    return res.status(500).json({ error: "Could not save your subscription. Please try again." });
  }
}
