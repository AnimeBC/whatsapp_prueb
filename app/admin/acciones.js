"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/api/prisma";
import { crearToken, OPCIONES_COOKIE } from "@/app/api/sesionToken";

export async function iniciarSesion(estadoPrevio, formData) {
  const correo = String(formData.get("correo") || "")
    .trim()
    .toLowerCase();
  const contrasena = String(formData.get("contrasena") || "");

  if (!correo || !contrasena) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const usuario = await prisma.usuario.findUnique({ where: { correo } });

  if (!usuario) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const valida = await bcrypt.compare(contrasena, usuario.contrasenaHash);

  if (!valida) {
    return { error: "Correo o contraseña incorrectos." };
  }

  if (usuario.rol !== "admin") {
    return { error: "Este acceso es solo para administradores." };
  }

  const almacen = await cookies();
  almacen.set("sesion", await crearToken(usuario), OPCIONES_COOKIE);

  redirect("/panel/dashboard");
}

export async function cerrarSesion() {
  const almacen = await cookies();
  almacen.delete("sesion");
  redirect("/");
}
