import { cookies } from "next/headers";
import { usuarioPorId, sinContrasena } from "@/app/api/almacen";
import { verificarToken } from "@/app/api/sesionToken";

export async function getSesion() {
  const almacen = await cookies();
  const token = almacen.get("sesion")?.value;

  if (!token) return null;

  const datos = await verificarToken(token);
  if (!datos?.id) return null;

  const usuario = await usuarioPorId(datos.id);
  return usuario ? sinContrasena(usuario) : null;
}
