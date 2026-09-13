import type { ConversionEventName } from "./schema";

const SESSION_KEY = "js_session";
const ATTRIBUTION_KEY = "js_attribution";

export function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "none";
  }
}

export interface Attribution {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  landing_page?: string;
}

/** Extract UTM params from URL and persist to localStorage (first-touch). */
function captureAttribution(): Attribution {
  try {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["source", "medium", "campaign", "content"] as const;
    const captured: Attribution = {};
    let hasUtm = false;

    for (const key of utmKeys) {
      const val = params.get(`utm_${key}`);
      if (val) {
        captured[key] = val;
        hasUtm = true;
      }
    }

    if (hasUtm) {
      captured.landing_page = window.location.pathname;
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(captured));
      return captured;
    }

    // Return stored first-touch attribution
    const stored = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;

    // No UTM, no stored — derive source from referrer
    const referrer = document.referrer;
    if (referrer) {
      try {
        const refHost = new URL(referrer).hostname;
        if (refHost.includes("instagram")) return { source: "instagram", medium: "referral" };
        if (refHost.includes("google")) return { source: "google", medium: "organic" };
        if (refHost.includes("facebook") || refHost.includes("fb")) return { source: "facebook", medium: "referral" };
        if (refHost.includes("twitter") || refHost.includes("x.com")) return { source: "twitter", medium: "referral" };
        return { source: refHost, medium: "referral" };
      } catch { /* invalid referrer URL */ }
    }

    return {};
  } catch {
    return {};
  }
}

export interface TrackContext {
  page?: string;
  content?: string;
  leadRef?: string;
  meta?: Record<string, unknown>;
}

/** Best-effort, fire-and-forget conversion event logging (A8). */
export function trackEvent(name: ConversionEventName, ctx: TrackContext = {}): void {
  try {
    const attribution = captureAttribution();
    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        session: getSessionId(),
        event: name,
        page: ctx.page ?? (typeof window !== "undefined" ? window.location.pathname : "unknown"),
        content: ctx.content,
        leadRef: ctx.leadRef,
        meta: { ...attribution, ...ctx.meta },
      }),
      keepalive: true,
    });
  } catch {
    /* never block the main thread */
  }
}
