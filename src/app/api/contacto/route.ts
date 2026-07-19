import { NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://docya-railway-production.up.railway.app";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const upstream = await fetch(`${API_BASE}/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      json = { detail: text };
    }

    if (!upstream.ok) {
      return NextResponse.json(json, { status: upstream.status });
    }

    return NextResponse.json(json, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar el mensaje" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: "Contacto endpoint activo" },
    { status: 200 }
  );
}
