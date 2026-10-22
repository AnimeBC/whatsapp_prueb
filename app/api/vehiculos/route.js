import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { leerDatos, guardarDatos, usuarioPorId, vehiculosDe } from "@/app/api/almacen";

async function sesionActual() {
  const almacen = await cookies();
  return usuarioPorId(almacen.get("sesion")?.value);
}

export async function GET() {
  const usuario = await sesionActual();
  if (!usuario) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const datos = await leerDatos();
  return NextResponse.json({ vehiculos: vehiculosDe(usuario, datos) });
}

export async function PATCH(request) {
  const usuario = await sesionActual();
  if (!usuario) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  if (usuario.rol !== "admin") {
    return NextResponse.json(
      { error: "Solo el administrador puede editar." },
      { status: 403 }
    );
  }

  const { placa, kmTotal, pago, semanaCirculacion, gps } = await request.json();
  const datos = await leerDatos();
  const vehiculo = datos.vehiculos.find((v) => v.placa === placa);

  if (!vehiculo) {
    return NextResponse.json(
      { error: "Vehículo no encontrado." },
      { status: 404 }
    );
  }

  if (kmTotal != null) {
    const valor = Number(kmTotal);
    const actual = vehiculo.kmTotal ?? 0;
    if (!Number.isFinite(valor) || valor < actual) {
      return NextResponse.json(
        { error: "El km total debe ser mayor o igual al actual." },
        { status: 400 }
      );
    }
    vehiculo.kmAnterior = vehiculo.kmTotal;
    vehiculo.kmTotal = valor;
  }

  if (pago === "pagado" || pago === "pendiente") {
    vehiculo.pago = pago;
  }

  if (semanaCirculacion != null) {
    const valorSemana = Number(semanaCirculacion);
    if (!Number.isInteger(valorSemana) || valorSemana < 0) {
      return NextResponse.json(
        { error: "La semana en circulación debe ser un entero positivo." },
        { status: 400 }
      );
    }
    vehiculo.semanaCirculacion = valorSemana;
  }

  if (gps != null) {
    const valorGps = String(gps).trim();
    if (valorGps && !/^https?:\/\//i.test(valorGps)) {
      return NextResponse.json(
        { error: "El link del GPS debe iniciar con http:// o https://." },
        { status: 400 }
      );
    }
    vehiculo.gps = valorGps || "#";
  }

  await guardarDatos(datos);
  return NextResponse.json({ vehiculo });
}
