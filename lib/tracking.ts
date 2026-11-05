/**
 * Analytics + attribution helpers.
 * - track(): pushes an event to the GTM dataLayer (GA4 picks it up via a tag).
 * - bookingUrl(): the MoeGo link with Google click ID + UTMs carried across, so a booking on
 *   booking.moego.pet can be attributed to the ad / channel that brought the visitor.
 */
import { site, type Service } from "@/data/site";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

const PARAMS = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const KEY = "prr_attr";

/** Call once on page load: remember click IDs / UTMs for the session. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const p of PARAMS) { const v = q.get(p); if (v) found[p] = v; }
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch { /* storage unavailable (private mode etc.) — attribution is best-effort */ }
}

export function bookingUrl(placement: string, service: Service = "mobile"): string {
  const u = new URL(site.booking[service]);
  try {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(KEY) : null;
    if (saved) for (const [k, v] of Object.entries(JSON.parse(saved) as Record<string, string>)) u.searchParams.set(k, v);
  } catch { /* ignore */ }
  u.searchParams.set("utm_placement", placement);
  u.searchParams.set("utm_service", service);
  return u.toString();
}

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
