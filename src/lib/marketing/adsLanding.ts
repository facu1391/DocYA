const KEY = "docya_ads_landing_journey";
const DAY_MS = 24 * 60 * 60 * 1000;

export async function sendLandingEvent(path: string, journeyId: string, request?: { consultationId: number; token: string }) {
  try {
    const api = process.env.NEXT_PUBLIC_API_BASE;
    if (!api) return false;
    const result = await fetch(`${api}/marketing/ads-landing/${path}`, {
      method: "POST",
      keepalive: true,
      referrerPolicy: "no-referrer",
      headers: { "Content-Type": "application/json", ...(request ? { Authorization: `Bearer ${request.token}` } : {}) },
      body: JSON.stringify({ journey_id: journeyId, ...(request ? { consultation_id: request.consultationId } : {}) }),
    });
    return result.ok;
  } catch { return false; }
}

export function saveLandingJourney(id: string) {
  try { sessionStorage.setItem(KEY, JSON.stringify({ id, expires: Date.now() + DAY_MS })); } catch { /* Care stays available. */ }
}

export async function countLandingRequest(consultationId: string, token: string) {
  try {
    const journey = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (!journey || journey.expires <= Date.now() || !/^\d+$/.test(consultationId)) return;
    const recorded = await sendLandingEvent("request", journey.id, { consultationId: Number(consultationId), token });
    if (recorded && JSON.parse(sessionStorage.getItem(KEY) || "null")?.id === journey.id) {
      sessionStorage.removeItem(KEY);
    }
  } catch { /* Measurement stays independent of care. */ }
}
