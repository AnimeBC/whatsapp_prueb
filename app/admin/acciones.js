"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { leerDatos } from "@/app/api/almacen";

export async function iniciarSesion(estadoPrevio, formData) {
  const correo = String(formData.get("correo") || "").trim();
  const contrasena = String(formData.get("contrasena") || "");

  if (!correo || !contrasena) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const datos = await leerDatos();
  const usuario = datos.usuarios.find(
    (u) => u.correo === correo && u.contrasena === contrasena
  );

  if (!usuario) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const almacen = await cookies();
  almacen.set("sesion", usuario.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function cerrarSesion() {
  const almacen = await cookies();
  almacen.delete("sesion");
  redirect("/admin/login");
}
