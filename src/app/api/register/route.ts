
// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Intentamos parsear JSON sin usar "any"
    let bodyUnknown: unknown;
    try {
      bodyUnknown = await req.json();
    } catch {
      bodyUnknown = null;
    }

    if (bodyUnknown === null || typeof bodyUnknown !== "object") {
      return NextResponse.json({ detail: "Cuerpo JSON inválido" }, { status: 400 });
    }

    // Usamos un tipo seguro para serializar
    const body = bodyUnknown as Record<string, unknown>;

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
      // Si el backend devuelve JSON, reenviamos como JSON
      try {
        const json = JSON.parse(text) as unknown;
        return NextResponse.json(json, { status: upstream.status });
      } catch {
        // Si no es JSON, devolvemos texto plano
        return new NextResponse(text, { status: upstream.status });
      }
    }

    // OK → devolver tal cual (JSON o texto)
    try {
      const json = JSON.parse(text) as unknown;
      return NextResponse.json(json, { status: upstream.status });
    } catch {
      return new NextResponse(text, { status: upstream.status });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    console.error("Proxy failure:", message);
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
