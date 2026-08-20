type VercelRequest = any;
type VercelResponse = any;

interface LeadPayload {
  name: string;
  email: string;
  business?: string;
  phone?: string;
  website?: string;
  message?: string;
  budget?: string;
  services?: string[];
  fax?: string; // Honeypot field
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
  };
  referrer?: string;
  source?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow only POST requests
  if (req.method !== "POST") {
    if (res.setHeader) res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body: LeadPayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const {
      name = "",
      email = "",
      business = "",
      phone = "",
      website = "",
      message = "",
      budget = "",
      services = [],
      fax = "",
      utm = {},
      referrer = "",
      source = "contact_form",
    } = body || {};

    // 1. Honeypot check: If bot filled the hidden "fax" field, silently discard and succeed
    if (fax && fax.trim() !== "") {
      return res.status(200).json({ ok: true, message: "Inquiry received" });
    }

    // 2. Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBusiness = business.trim();
    const trimmedWebsite = website.trim();
    const trimmedMessage = message.trim();
    const trimmedPhone = phone.trim();

    // Split Name for Zoho CRM (First Name & Last Name)
    const nameParts = trimmedName.split(" ").filter(Boolean);
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : trimmedName;
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : trimmedName;
    const company = trimmedBusiness || (trimmedWebsite ? trimmedWebsite.replace(/^https?:\/\//, "").split("/")[0] : `${trimmedName} (Individual)`);

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID || "51e13387-ba30-4934-895e-dc2944eed9a7";
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Anan · Open Brands <anan@openbrands.studio>";
    const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "twijjukyeanan00@gmail.com";

    const todayDate = new Date().toISOString().split("T")[0];

    // Build UTM summary text
    const utmDetails = [
      utm.utm_source ? `Source: ${utm.utm_source}` : null,
      utm.utm_medium ? `Medium: ${utm.utm_medium}` : null,
      utm.utm_campaign ? `Campaign: ${utm.utm_campaign}` : null,
      utm.utm_term ? `Term: ${utm.utm_term}` : null,
      utm.utm_content ? `Content: ${utm.utm_content}` : null,
      utm.gclid ? `GCLID: ${utm.gclid}` : null,
    ].filter(Boolean).join(" | ");

    // Combined notes for CRM records
    const fullNotes = [
      trimmedMessage ? `Message: ${trimmedMessage}` : null,
      trimmedBusiness ? `Company: ${trimmedBusiness}` : null,
      trimmedWebsite ? `Website: ${trimmedWebsite}` : null,
      trimmedPhone ? `Phone: ${trimmedPhone}` : null,
      budget ? `Budget: ${budget}` : null,
      services.length ? `Services: ${services.join(", ")}` : null,
      source ? `Source: ${source}` : null,
      utmDetails ? `Campaign: ${utmDetails}` : null,
      referrer ? `Referrer: ${referrer}` : null,
    ].filter(Boolean).join("\n\n");

    const tasks: Promise<any>[] = [];

    // -------------------------------------------------------------
    // TASK 1: Zoho CRM Web-to-Lead Sync
    // -------------------------------------------------------------
    const zohoTask = (async () => {
      try {
        const zohoFormData = new URLSearchParams();
        zohoFormData.append("xnQsjsdp", "80819a6df3c63ae73bdbd764cecec998a40a06ba027384caf115280438bd9e4b");
        zohoFormData.append("xmIwtLD", "74d690d45af5cb7d743d87b0d3f0fd381bf8fdb424b87ea6bf58c8c1cafd2ca8793d9c8a2dfb4e60bf92d2452b0611d6");
        zohoFormData.append("actionType", "TGVhZHM=");
        zohoFormData.append("returnURL", "https://openbrands.studio/thank-you");
        zohoFormData.append("Company", company);
        zohoFormData.append("First Name", firstName);
        zohoFormData.append("Last Name", lastName);
        zohoFormData.append("Email", trimmedEmail);
        if (trimmedWebsite) {
          const validUrl = trimmedWebsite.startsWith("http") ? trimmedWebsite : `https://${trimmedWebsite}`;
          zohoFormData.append("Website", validUrl);
        }
        if (trimmedPhone) {
          zohoFormData.append("Phone", trimmedPhone);
        }
        if (fullNotes) {
          zohoFormData.append("Description", fullNotes);
        }

        const zohoRes = await fetch("https://crm.zoho.com/crm/WebToLeadForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: zohoFormData.toString(),
        });

        console.log("Zoho Web-to-Lead status:", zohoRes.status);
      } catch (zohoErr) {
        console.error("Zoho Sync Error:", zohoErr);
      }
    })();
    tasks.push(zohoTask);

    // -------------------------------------------------------------
    // TASK 2: Notion CRM Sync (Schema-Aware & Resilient)
    // -------------------------------------------------------------
    if (NOTION_TOKEN && NOTION_LEADS_DB_ID) {
      const notionTask = (async () => {
        try {
          // Format Database ID (strip dashes if any format issues)
          const cleanDbId = NOTION_LEADS_DB_ID.replace(/-/g, "");

          // 1. Fetch database schema to see exact column names and types
          let dbSchema: any = null;
          try {
            const dbRes = await fetch(`https://api.notion.com/v1/databases/${cleanDbId}`, {
              headers: {
                Authorization: `Bearer ${NOTION_TOKEN.trim()}`,
                "Notion-Version": "2022-06-28",
              },
            });
            if (dbRes.ok) {
              dbSchema = await dbRes.json();
            } else {
              const errText = await dbRes.text();
              console.error("Notion DB Schema fetch error:", dbRes.status, errText);
            }
          } catch (schemaErr) {
            console.warn("Could not pre-fetch Notion schema:", schemaErr);
          }

          const properties: Record<string, any> = {};

          if (dbSchema && dbSchema.properties) {
            const cols = dbSchema.properties;

            // Map title column (whatever column is type "title")
            const titlePropKey = Object.keys(cols).find((k) => cols[k].type === "title") || "Name";
            properties[titlePropKey] = {
              title: [{ text: { content: trimmedBusiness ? `${trimmedName} (${trimmedBusiness})` : trimmedName } }],
            };

            // Map Email
            const emailKey = Object.keys(cols).find((k) => cols[k].type === "email" || k.toLowerCase() === "email");
            if (emailKey) {
              properties[emailKey] = { email: trimmedEmail };
            }

            // Map Stage / Status
            const stageKey = Object.keys(cols).find((k) => k.toLowerCase().includes("stage") || k.toLowerCase().includes("status"));
            if (stageKey) {
              const colDef = cols[stageKey];
              if (colDef.type === "select") {
                const opt = colDef.select?.options?.find((o: any) => o.name.includes("New") || o.name.includes("Inquiry")) || colDef.select?.options?.[0];
                if (opt) properties[stageKey] = { select: { name: opt.name } };
              } else if (colDef.type === "status") {
                const opt = colDef.status?.options?.find((o: any) => o.name.includes("New") || o.name.includes("Inquiry")) || colDef.status?.options?.[0];
                if (opt) properties[stageKey] = { status: { name: opt.name } };
              }
            }

            // Map Next Action Date
            const dateKey = Object.keys(cols).find((k) => cols[k].type === "date");
            if (dateKey) {
              properties[dateKey] = { date: { start: todayDate } };
            }

            // Map Phone
            const phoneKey = Object.keys(cols).find((k) => cols[k].type === "phone_number" || k.toLowerCase() === "phone");
            if (phoneKey && trimmedPhone) {
              properties[phoneKey] = { phone_number: trimmedPhone };
            }

            // Map Website
            const websiteKey = Object.keys(cols).find((k) => cols[k].type === "url" || k.toLowerCase() === "website");
            if (websiteKey && trimmedWebsite) {
              const validUrl = trimmedWebsite.startsWith("http") ? trimmedWebsite : `https://${trimmedWebsite}`;
              properties[websiteKey] = { url: validUrl };
            }

            // Map Company
            const companyKey = Object.keys(cols).find((k) => k.toLowerCase() === "company" || k.toLowerCase() === "business");
            if (companyKey && trimmedBusiness && cols[companyKey].type === "rich_text") {
              properties[companyKey] = { rich_text: [{ text: { content: trimmedBusiness } }] };
            }

            // Map Notes
            const notesKey = Object.keys(cols).find((k) => k.toLowerCase() === "notes" || k.toLowerCase() === "description" || k.toLowerCase() === "message");
            if (notesKey && cols[notesKey].type === "rich_text") {
              properties[notesKey] = { rich_text: [{ text: { content: fullNotes.slice(0, 2000) } }] };
            }
          } else {
            // Default property structure
            properties["Name"] = {
              title: [{ text: { content: trimmedBusiness ? `${trimmedName} (${trimmedBusiness})` : trimmedName } }],
            };
            properties["Email"] = { email: trimmedEmail };
          }

          // Create Notion page
          const notionCreateRes = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_TOKEN.trim()}`,
              "Content-Type": "application/json",
              "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify({
              parent: { database_id: cleanDbId },
              properties,
            }),
          });

          if (!notionCreateRes.ok) {
            const notionErrText = await notionCreateRes.text();
            console.error("Notion Page Create Error:", notionCreateRes.status, notionErrText);
          } else {
            console.log("Notion lead created successfully!");
          }
        } catch (notionErr) {
          console.error("Notion Execution Error:", notionErr);
        }
      })();
      tasks.push(notionTask);
    } else {
      console.warn("Notion Token or DB ID missing in process.env");
    }

    // -------------------------------------------------------------
    // TASK 3: Resend Emails (Auto-Reply & Notification)
    // -------------------------------------------------------------
    if (RESEND_API_KEY) {
      const emailTask = (async () => {
        try {
          // Auto-reply to lead
          const autoReplyHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
              <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">We received your inquiry!</h2>
              <p>Hi ${firstName},</p>
              <p>Thanks for reaching out to Open Brands. We have received your details and are reviewing your project requirements.</p>
              <p>We will get back to you within <strong>one working day</strong> with next steps.</p>
              <br/>
              <p>Best regards,<br/><strong>Anan</strong><br/>Open Brands<br/><a href="https://openbrands.studio" style="color: #111; text-decoration: underline;">openbrands.studio</a></p>
            </div>
          `;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY.trim()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: LEAD_FROM_EMAIL.trim(),
              to: [trimmedEmail],
              reply_to: LEAD_NOTIFY_EMAIL.trim(),
              subject: `Thank you for contacting Open Brands`,
              html: autoReplyHtml,
            }),
          });

          // Admin notification email
          const adminHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0D0D0D;">🔥 New Lead: ${trimmedName}</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${trimmedName}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${trimmedEmail}">${trimmedEmail}</a></td></tr>
                ${trimmedBusiness ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${trimmedBusiness}</td></tr>` : ""}
                ${trimmedPhone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${trimmedPhone}">${trimmedPhone}</a></td></tr>` : ""}
                ${trimmedWebsite ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Website:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="${trimmedWebsite.startsWith("http") ? trimmedWebsite : `https://${trimmedWebsite}`}" target="_blank">${trimmedWebsite}</a></td></tr>` : ""}
                ${trimmedMessage ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${trimmedMessage}</td></tr>` : ""}
                ${utmDetails ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Campaign:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${utmDetails}</td></tr>` : ""}
                ${referrer ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Referrer:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${referrer}</td></tr>` : ""}
              </table>
            </div>
          `;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY.trim()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: LEAD_FROM_EMAIL.trim(),
              to: [LEAD_NOTIFY_EMAIL.trim()],
              reply_to: trimmedEmail,
              subject: `[New Lead] ${trimmedName} — Open Brands`,
              html: adminHtml,
            }),
          });
        } catch (resendErr) {
          console.error("Resend Sync Error:", resendErr);
        }
      })();
      tasks.push(emailTask);
    } else {
      console.warn("Resend API Key missing in process.env");
    }

    // Await all parallel tasks
    await Promise.allSettled(tasks);

    return res.status(200).json({ ok: true, message: "Lead submitted successfully" });
  } catch (error: any) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: error?.message || "Internal server error." });
  }
}
