import { insertRow, supabaseConfigured } from "./_lib/supabase";

type VercelRequest = any;
type VercelResponse = any;

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
