import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // TODO: procesar el contacto (SendGrid, etc.)
    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Contacto endpoint" }, { status: 200 });
}
