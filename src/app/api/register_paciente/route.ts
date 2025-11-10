// src/app/api/register_paciente/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let body: any = null;
    try { body = await req.json(); } catch { /* ignore */ }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ detail: "Cuerpo JSON inválido" }, { status: 400 });
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) {
      return NextResponse.json({ detail: "Falta config del backend" }, { status: 500 });
    }

    // Normalizaciones mínimas
    body.email = String(body.email || "").toLowerCase().trim();
    body.full_name = String(body.full_name || "").trim();
    body.acepto_condiciones = !!body.acepto_condiciones;

    const upstream = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      try { return NextResponse.json(JSON.parse(text), { status: upstream.status }); }
      catch { return new NextResponse(text, { status: upstream.status }); }
    }

    try { return NextResponse.json(JSON.parse(text), { status: upstream.status }); }
    catch { return new NextResponse(text, { status: upstream.status }); }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
