import { cookies } from "next/headers";
import { usuarioPorId, sinContrasena } from "@/app/api/almacen";

export async function getSesion() {
  const almacen = await cookies();
  const usuario = await usuarioPorId(almacen.get("sesion")?.value);
  return usuario ? sinContrasena(usuario) : null;
}
