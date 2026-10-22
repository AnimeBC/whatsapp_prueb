"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { leerDatos, guardarDatos } from "@/app/api/almacen";

const OPCIONES_COOKIE = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 8,
};

export async function iniciarSesionSocio(estadoPrevio, formData) {
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

  if (usuario.rol !== "propietario") {
    return { error: "Este acceso es solo para socios." };
  }

  const almacen = await cookies();
  almacen.set("sesion", usuario.id, OPCIONES_COOKIE);

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

  const datos = await leerDatos();
  if (datos.usuarios.some((u) => u.correo.toLowerCase() === correo)) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const nuevo = {
    id: `socio-${Date.now().toString(36)}`,
    nombre,
    correo,
    contrasena,
    rol: "propietario",
    vehiculos: [],
  };

  datos.usuarios.push(nuevo);
  await guardarDatos(datos);

  const almacen = await cookies();
  almacen.set("sesion", nuevo.id, OPCIONES_COOKIE);

  redirect("/panel/dashboard");
}
