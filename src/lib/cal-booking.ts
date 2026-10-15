import type React from "react";

// Every "Book a call" button opens this Cal.com event in a pop-up.
const CAL_LINK = "twijjukye-anan-m21aet/30min";
const CAL_NAMESPACE = "30min";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_EMBED_SRC = "https://app.cal.com/embed/embed.js";
const GOOGLE_ADS_BOOKING_CONVERSION = "AW-18495990613/YbVkCLSx750dENXWyfNE";

/** Fallback for booking links when JavaScript hasn't run yet. */
export const CAL_BOOKING_URL = `https://cal.com/${CAL_LINK}`;

type CalApi = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  ns?: Record<string, CalApi>;
  loaded?: boolean;
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalApi;
    __obCalBookingListener?: boolean;
  }
}

/**
 * Cal.com's embed bootstrap, as published in their embed snippet: it queues
 * calls on window.Cal and injects embed.js on the first one.
 */
function getCal(): CalApi {
  if (window.Cal) return window.Cal;
  const push = (api: CalApi, args: unknown[]) => {
    (api.q = api.q || []).push(args);
  };
  const cal: CalApi = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src = CAL_EMBED_SRC;
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const api: CalApi = function (...apiArgs: unknown[]) {
        push(api, apiArgs);
      };
      const namespace = args[1];
      if (typeof namespace === "string") {
        cal.ns![namespace] = cal.ns![namespace] || api;
        push(cal.ns![namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }
    push(cal, args);
  };
  window.Cal = cal;
  return cal;
}

/** Inits the Cal.com namespace and the conversion listener once per page load. */
function getCalNamespace(): CalApi {
  const Cal = getCal();
  if (!Cal.ns?.[CAL_NAMESPACE]) {
    Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    Cal.ns![CAL_NAMESPACE]("ui", {
      cssVarsPerTheme: { dark: { "cal-brand": "#afe63d" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }
  const cal = Cal.ns![CAL_NAMESPACE];

  // A window flag, so React strict mode and route changes never add a second one.
  if (!window.__obCalBookingListener) {
    window.__obCalBookingListener = true;
    cal("on", {
      action: "bookingSuccessfulV2",
      callback: () => {
        try {
          if (typeof window.gtag === "function") {
            window.gtag("event", "conversion", { send_to: GOOGLE_ADS_BOOKING_CONVERSION });
          }
        } catch {
          // Tracking must never break the booking flow.
        }
      },
    });
  }

  return cal;
}

/** Loads the embed once the page has finished loading, so it never delays first paint. */
export function loadCalEmbed() {
  if (document.readyState === "complete") {
    getCalNamespace();
  } else {
    window.addEventListener("load", () => getCalNamespace(), { once: true });
  }
}

export function openBookingPopup() {
  getCalNamespace()("modal", {
    calLink: CAL_LINK,
    calOrigin: CAL_ORIGIN,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
  });
}

/** onClick for booking links: opens the pop-up instead of following the cal.com fallback. */
export function handleBookingClick(e: React.MouseEvent<HTMLElement>) {
  e.preventDefault();
  openBookingPopup();
}
