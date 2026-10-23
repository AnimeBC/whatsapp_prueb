import { NextResponse } from "next/server";
import { getSesion } from "@/_Pages/admin/datos/sesion";

export async function GET() {
  const usuario = await getSesion();

  if (!usuario) {
    return NextResponse.json({ usuario: null });
  }

  return NextResponse.json({ usuario });
}
