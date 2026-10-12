import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const API = (process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");
const services = { teleconsulta: "teleconsulta", medico: "consulta-medico", enfermero: "consulta-enfermero" };

// Only proxies the existing public quotes. Never reads administrative routes,
// authentication, user records, or clinical information.
export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const entries = await Promise.all(Object.entries(services).flatMap(([id, endpoint]) => ["diurna", "nocturna"].map(async turno => {
      try {
        const response = await fetch(`${API}/tarifas/${endpoint}?turno=${turno}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) return null;
        const quote = await response.json();
        if (typeof quote.monto !== "number" || !Number.isFinite(quote.monto) || quote.monto <= 0) return null;
        return [`${id}-${turno}`, { monto: quote.monto }] as const;
      } catch { return null; }
    })));
    const quotes = Object.fromEntries(entries.filter((entry): entry is NonNullable<typeof entry> => entry !== null));
    return NextResponse.json(quotes, { status: Object.keys(quotes).length ? 200 : 503, headers: { "Cache-Control": "no-store" } });
  } finally { clearTimeout(timeout); }
}
