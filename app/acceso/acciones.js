"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/api/prisma";
import { crearToken, OPCIONES_COOKIE } from "@/app/api/sesionToken";

export async function iniciarSesionSocio(estadoPrevio, formData) {
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

  if (usuario.rol !== "propietario") {
    return { error: "Este acceso es solo para socios." };
  }

  const almacen = await cookies();
  almacen.set("sesion", await crearToken(usuario), OPCIONES_COOKIE);

  redirect("/panel/dashboard");
}

export async function registrarSocio(estadoPrevio, formData) {
  const nombre = String(formData.get("nombre") || "").trim();
  const correo = String(formData.get("correo") || "")
    .trim()
    .toLowerCase();
  const contrasena = String(formData.get("contrasena") || "");

  if (!nombre || !correo || !contrasena) {
    return { error: "Completa todos los campos." };
  }

  if (contrasena.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const existente = await prisma.usuario.findUnique({ where: { correo } });

  if (existente) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const contrasenaHash = await bcrypt.hash(contrasena, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      contrasenaHash,
      rol: "propietario",
    },
  });

  const almacen = await cookies();
  almacen.set("sesion", await crearToken(usuario), OPCIONES_COOKIE);

  redirect("/panel/dashboard");
}
