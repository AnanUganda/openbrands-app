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
      budget ? `Budget: ${budget}` : null,
      services.length ? `Services: ${services.join(", ")}` : null,
      source ? `Source: ${source}` : null,
      utmDetails ? `Campaign: ${utmDetails}` : null,
      referrer ? `Referrer: ${referrer}` : null,
    ].filter(Boolean).join("\n\n");

    // Parallel execution promises
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

        if (!zohoRes.ok) {
          console.error("Zoho Web-to-Lead response status:", zohoRes.status);
        }
      } catch (zohoErr) {
        console.error("Zoho Sync Error (non-blocking):", zohoErr);
      }
    })();
    tasks.push(zohoTask);

    // -------------------------------------------------------------
    // TASK 2: Notion CRM Sync
    // -------------------------------------------------------------
    if (NOTION_TOKEN && NOTION_LEADS_DB_ID) {
      const notionTask = (async () => {
        try {
          const notionProperties: Record<string, any> = {
            Name: {
              title: [
                {
                  text: {
                    content: trimmedBusiness ? `${trimmedName} (${trimmedBusiness})` : trimmedName,
                  },
                },
              ],
            },
            Email: {
              email: trimmedEmail,
            },
            Stage: {
              select: {
                name: "1 · New Inquiry",
              },
            },
            "Next Action Date": {
              date: {
                start: todayDate,
              },
            },
          };

          if (trimmedPhone) {
            notionProperties["Phone"] = { phone_number: trimmedPhone };
          }
          if (trimmedWebsite) {
            const validUrl = trimmedWebsite.startsWith("http") ? trimmedWebsite : `https://${trimmedWebsite}`;
            notionProperties["Website"] = { url: validUrl };
          }
          if (trimmedBusiness) {
            notionProperties["Company"] = {
              rich_text: [{ text: { content: trimmedBusiness } }],
            };
          }
          if (fullNotes) {
            notionProperties["Notes"] = {
              rich_text: [{ text: { content: fullNotes.slice(0, 2000) } }],
            };
          }

          const notionRes = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_TOKEN}`,
              "Content-Type": "application/json",
              "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify({
              parent: { database_id: NOTION_LEADS_DB_ID },
              properties: notionProperties,
            }),
          });

          if (!notionRes.ok) {
            const notionErrorText = await notionRes.text();
            console.error("Notion API Error:", notionRes.status, notionErrorText);
          }
        } catch (notionErr) {
          console.error("Notion Sync Error (non-blocking):", notionErr);
        }
      })();
      tasks.push(notionTask);
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
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: LEAD_FROM_EMAIL,
              to: [trimmedEmail],
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
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: LEAD_FROM_EMAIL,
              to: [LEAD_NOTIFY_EMAIL],
              subject: `[New Lead] ${trimmedName} — Open Brands`,
              html: adminHtml,
            }),
          });
        } catch (resendErr) {
          console.error("Resend Sync Error (non-blocking):", resendErr);
        }
      })();
      tasks.push(emailTask);
    }

    // Await all parallel tasks using allSettled to ensure complete resilience
    await Promise.allSettled(tasks);

    return res.status(200).json({ ok: true, message: "Lead submitted successfully" });
  } catch (error: any) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: error?.message || "Internal server error." });
  }
}
