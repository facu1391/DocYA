// src/app/api/contacto/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // 📩 En el futuro podés integrar SendGrid o EmailJS acá
    // Ejemplo: await sendEmail(body);

    console.log("[CONTACTO] Nuevo mensaje recibido:", body);

    return NextResponse.json(
      { ok: true, received: body, message: "Contacto recibido correctamente" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
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

