import { CONSENT_EVENT } from "./measurement";

const KEY = "docya_analytics_consent_v1";

export function analyticsConsent(): boolean | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    const age = Date.now() - Number(saved?.at);
    return typeof saved?.allowed === "boolean" && age >= 0 && age < 180 * 86400000
      ? saved.allowed : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsConsent(allowed: boolean) {
  localStorage.setItem(KEY, JSON.stringify({ allowed, at: Date.now() }));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
