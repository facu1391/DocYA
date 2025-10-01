
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data?.website) return NextResponse.json({ ok: true }, { status: 200 }); // honeypot
    console.log("[CONTACTO] Nuevo mensaje:", data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
