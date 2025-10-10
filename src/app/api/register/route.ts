
// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";          // ← importante para uploads
export const dynamic = "force-dynamic";   // ← evita caché en dev

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) {
      console.error("Falta NEXT_PUBLIC_API_BASE");
      return NextResponse.json({ detail: "Falta config del backend" }, { status: 500 });
    }

    const upstream = await fetch(`${API_BASE}/auth/register_medico`, {
      method: "POST",
      body: form, // NO seteés Content-Type
    });

    const text = await upstream.text(); // leemos SIEMPRE el cuerpo para log
    if (!upstream.ok) {
      console.error("Upstream error:", upstream.status, text);
      // Intentar reenviar como JSON si lo es
      try {
        const json = JSON.parse(text);
        return NextResponse.json(json, { status: upstream.status });
      } catch {
        return new NextResponse(text, { status: upstream.status });
      }
    }

    // OK → devolver tal cual (JSON o texto)
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
