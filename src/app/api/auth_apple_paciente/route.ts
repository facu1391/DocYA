import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const identityToken = String(body?.identity_token ?? "").trim();
    const fullName = String(body?.full_name ?? "").trim() || undefined;
    const email = String(body?.email ?? "").trim() || undefined;
    const codigoReferido = String(body?.codigo_referido ?? "").trim() || undefined;

    if (!identityToken) {
      return NextResponse.json({ detail: "Token Apple faltante" }, { status: 400 });
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) {
      return NextResponse.json({ detail: "Falta config del backend" }, { status: 500 });
    }

    const upstream = await fetch(`${API_BASE}/auth/apple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity_token: identityToken, full_name: fullName, email, codigo_referido: codigoReferido }),
    });

    const text = await upstream.text();
    try {
      return NextResponse.json(JSON.parse(text), { status: upstream.status });
    } catch {
      return new NextResponse(text, { status: upstream.status });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
