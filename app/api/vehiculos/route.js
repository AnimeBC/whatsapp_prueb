import { NextResponse } from "next/server";
import { prisma } from "@/app/api/prisma";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import { serializarVehiculo } from "@/app/api/almacen";

async function sesionActual() {
  return getSesion();
}

export async function GET() {
  const usuario = await sesionActual();

  if (!usuario) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const registros = await prisma.vehiculo.findMany({
    where: usuario.rol === "admin" ? {} : { propietarioId: usuario.id },
    include: {
      historialKm: { orderBy: { fecha: "desc" }, take: 6 },
    },
    orderBy: { placa: "asc" },
  });

  return NextResponse.json({
    vehiculos: registros.map(serializarVehiculo),
  });
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

  const { placa, kmTotal, pago, semanaCirculacion, gps } =
    await request.json();

  if (!placa) {
    return NextResponse.json(
      { error: "Falta la placa del vehículo." },
      { status: 400 }
    );
  }

  const actual = await prisma.vehiculo.findUnique({ where: { placa } });

  if (!actual) {
    return NextResponse.json(
      { error: "Vehículo no encontrado." },
      { status: 404 }
    );
  }

  const cambios = {};
  let diferenciaKm = null;

  if (kmTotal != null) {
    const valor = Number(kmTotal);
    const kilometrajeActual = actual.kmTotal ?? 0;

    if (!Number.isInteger(valor) || valor < kilometrajeActual) {
      return NextResponse.json(
        { error: "El km total debe ser mayor o igual al actual." },
        { status: 400 }
      );
    }

    cambios.kmAnterior = actual.kmTotal;
    cambios.kmTotal = valor;
    diferenciaKm = actual.kmTotal != null ? valor - kilometrajeActual : null;
  }

  if (pago === "pagado" || pago === "pendiente") {
    cambios.pago = pago;
  }

  if (semanaCirculacion != null) {
    const valorSemana = Number(semanaCirculacion);

    if (!Number.isInteger(valorSemana) || valorSemana < 0) {
      return NextResponse.json(
        { error: "La semana en circulación debe ser un entero positivo." },
        { status: 400 }
      );
    }

    cambios.semanaCirculacion = valorSemana;
  }

  if (gps != null) {
    const valorGps = String(gps).trim();

    if (valorGps && !/^https?:\/\//i.test(valorGps)) {
      return NextResponse.json(
        { error: "El link del GPS debe iniciar con http:// o https://." },
        { status: 400 }
      );
    }

    cambios.gps = valorGps || null;
  }

  if (Object.keys(cambios).length === 0) {
    return NextResponse.json(
      { error: "No hay cambios para guardar." },
      { status: 400 }
    );
  }

  const vehiculo = await prisma.$transaction(async (tx) => {
    await tx.vehiculo.update({ where: { placa }, data: cambios });

    if (diferenciaKm != null && diferenciaKm > 0) {
      const semana =
        cambios.semanaCirculacion ?? actual.semanaCirculacion ?? 0;

      const registro = await tx.historialKm.findFirst({
        where: { vehiculoId: placa, semana },
        orderBy: { fecha: "desc" },
      });

      if (registro) {
        await tx.historialKm.update({
          where: { id: registro.id },
          data: { km: registro.km + diferenciaKm, fecha: new Date() },
        });
      } else {
        await tx.historialKm.create({
          data: { vehiculoId: placa, semana, km: diferenciaKm },
        });
      }
    }

    return tx.vehiculo.findUnique({
      where: { placa },
      include: {
        historialKm: { orderBy: { fecha: "desc" }, take: 6 },
      },
    });
  });

  return NextResponse.json({ vehiculo: serializarVehiculo(vehiculo) });
}
