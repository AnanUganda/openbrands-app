// Google Analytics 4 & Campaign Tracking Helper

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
}

/**
 * Extracts UTM and Google Click ID parameters from URL query strings.
 */
export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const term = params.get("utm_term");
  const content = params.get("utm_content");
  const gclid = params.get("gclid");

  if (source) utm.utm_source = source;
  if (medium) utm.utm_medium = medium;
  if (campaign) utm.utm_campaign = campaign;
  if (term) utm.utm_term = term;
  if (content) utm.utm_content = content;
  if (gclid) utm.gclid = gclid;

  return utm;
}

/**
 * Safely fires GA4 key event 'generate_lead' for conversion tracking.
 */
export function trackLeadGenerated(leadSource: string = "contact_form", extraData: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      lead_source: leadSource,
      ...extraData,
    });
  }
}
