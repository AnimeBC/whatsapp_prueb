import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { usuarioPorId, sinContrasena } from "@/app/api/almacen";

export async function GET() {
  const almacen = await cookies();
  const usuario = await usuarioPorId(almacen.get("sesion")?.value);

  if (!usuario) {
    return NextResponse.json({ usuario: null }, { status: 401 });
  }

  return NextResponse.json({ usuario: sinContrasena(usuario) });
}
