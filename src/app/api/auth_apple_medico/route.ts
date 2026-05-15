import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://docya-railway-production.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const identityToken = String(body?.identity_token ?? "").trim();
    if (!identityToken) {
      return NextResponse.json({ detail: "Token Apple faltante" }, { status: 400 });
    }

    const upstream = await fetch(`${API_BASE}/auth/apple_medico`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identity_token: identityToken,
        full_name: body?.full_name,
        email: body?.email,
      }),
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
