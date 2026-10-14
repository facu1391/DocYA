import { NextResponse } from "next/server";
import { professionalModalities } from "@/components/professionals/modalities";

export const dynamic = "force-dynamic";
const API = (process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");

// Same-origin read-only proxy, following /api/tarifas-publicas. It reads only
// existing public quotes; no private routes, auth, payment or database writes.
export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const entries = await Promise.all(professionalModalities.map(async modality => {
      try {
        const response = await fetch(`${API}/tarifas/${modality.endpoint}?turno=${modality.turno}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) return null;
        const quote = await response.json();
        const fee = quote.monto_profesional ?? quote.neto_profesional;
        return typeof fee === "number" && Number.isFinite(fee) && fee > 0 ? [modality.id, fee] as const : null;
      } catch { return null; }
    }));
    const fees = Object.fromEntries(entries.filter((entry): entry is NonNullable<typeof entry> => entry !== null));
    return NextResponse.json(fees, { status: Object.keys(fees).length ? 200 : 503, headers: { "Cache-Control": "no-store" } });
  } finally { clearTimeout(timeout); }
}
