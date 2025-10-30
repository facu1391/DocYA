
// src/app/api/register_medico/route.ts  (o donde tengas este proxy)
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1) Parseo seguro
    let bodyUnknown: unknown = null;
    try {
      bodyUnknown = await req.json();
    } catch {
      /* ignore */
    }
    if (bodyUnknown === null || typeof bodyUnknown !== "object") {
      return NextResponse.json({ detail: "Cuerpo JSON inválido" }, { status: 400 });
    }

    // 2) Normalización de campos (rol -> tipo, y forzamos "medico" | "enfermero")
    const body = { ...(bodyUnknown as Record<string, unknown>) };

    // Si viene "rol" y no viene "tipo", lo copiamos
    if (body["rol"] != null && body["tipo"] == null) {
      body["tipo"] = body["rol"];
    }

    // Normalizamos a string y lowercase
    if (body["tipo"] != null) {
      const t = String(body["tipo"]).toLowerCase().trim();
      const norm = t.includes("enfermer") ? "enfermero" : "medico"; // cubre "enfermero/a", "enfermera"
      body["tipo"] = norm === "enfermero" ? "enfermero" : "medico";
    }

    // (Opcional) si no vino nada válido, rechazamos
    if (body["tipo"] !== "medico" && body["tipo"] !== "enfermero") {
      return NextResponse.json({ detail: "Campo 'tipo' inválido" }, { status: 400 });
    }

    // 3) Enviamos al backend
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
    if (!API_BASE) {
      return NextResponse.json({ detail: "Falta config del backend" }, { status: 500 });
    }

    const upstream = await fetch(`${API_BASE}/auth/register_medico`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      try {
        const json = JSON.parse(text) as unknown;
        return NextResponse.json(json, { status: upstream.status });
      } catch {
        return new NextResponse(text, { status: upstream.status });
      }
    }

    try {
      const json = JSON.parse(text) as unknown;
      return NextResponse.json(json, { status: upstream.status });
    } catch {
      return new NextResponse(text, { status: upstream.status });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
