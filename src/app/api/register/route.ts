import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ detail: "Cuerpo JSON inválido" }, { status: 400 });
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) {
      console.error("Falta NEXT_PUBLIC_API_BASE");
      return NextResponse.json({ detail: "Falta config del backend" }, { status: 500 });
    }

    const upstream = await fetch(`${API_BASE}/auth/register_medico`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.error("Upstream error:", upstream.status, text);
      try {
        const json = JSON.parse(text);
        return NextResponse.json(json, { status: upstream.status });
      } catch {
        return new NextResponse(text, { status: upstream.status });
      }
    }

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: upstream.status });
    } catch {
      return new NextResponse(text, { status: upstream.status });
    }
  } catch (err: any) {
    console.error("Proxy failure:", err);
    return NextResponse.json({ detail: err?.message ?? "Proxy error" }, { status: 500 });
  }
}
