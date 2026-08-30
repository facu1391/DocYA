import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");
  if (role !== "doctor" && role !== "patient") {
    return NextResponse.json({ detail: "Rol inválido" }, { status: 400 });
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/token?role=${role}`, {
      cache: "no-store",
    });
    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json(
      { detail: "El servidor local LiveKit no está disponible" },
      { status: 503 },
    );
  }
}
