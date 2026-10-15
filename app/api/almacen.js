import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RUTA = path.join(process.cwd(), "data", "datos.json");

export async function leerDatos() {
  const texto = await readFile(RUTA, "utf8");
  return JSON.parse(texto);
}

export async function guardarDatos(datos) {
  await writeFile(RUTA, JSON.stringify(datos, null, 2), "utf8");
}

export async function usuarioPorId(id) {
  if (!id) return null;
  const datos = await leerDatos();
  return datos.usuarios.find((u) => u.id === id) || null;
}

export function sinContrasena(usuario) {
  const copia = { ...usuario };
  delete copia.contrasena;
  return copia;
}

export function vehiculosDe(usuario, datos) {
  if (usuario.rol === "admin") return datos.vehiculos;
  return datos.vehiculos.filter((v) =>
    usuario.vehiculos.includes(v.placa)
  );
}
