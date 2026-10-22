const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const datos = require("../data/datos.json");

const prisma = new PrismaClient();

function aFecha(valor) {
  if (!valor) return null;
  return new Date(`${valor}T12:00:00.000Z`);
}

async function main() {
  const propietarioPorPlaca = new Map();

  for (const usuario of datos.usuarios) {
    const correo = usuario.correo.trim().toLowerCase();
    const contrasenaHash = await bcrypt.hash(
      usuario.contrasena || "123456",
      10
    );

    await prisma.usuario.upsert({
      where: { correo },
      create: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo,
        contrasenaHash,
        rol: usuario.rol,
      },
      update: {
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });

    for (const placa of usuario.vehiculos ?? []) {
      propietarioPorPlaca.set(placa, usuario.id);
    }
  }

  for (const vehiculo of datos.vehiculos) {
    const propietarioId = propietarioPorPlaca.get(vehiculo.placa) ?? null;
    const base = {
      modelo: vehiculo.modelo,
      poliza: vehiculo.poliza ?? null,
      vigencia: aFecha(vehiculo.vigencia),
      conductor: vehiculo.conductor ?? null,
      whatsapp: vehiculo.whatsapp ?? null,
      familiar: vehiculo.familiar ?? null,
      gps: vehiculo.gps ?? null,
      incidencias: vehiculo.incidencias ?? null,
      servicio: vehiculo.servicio ?? null,
      kmAnterior: vehiculo.kmAnterior ?? null,
      kmTotal: vehiculo.kmTotal ?? null,
      semanaCirculacion: vehiculo.semanaCirculacion ?? 0,
      pago: vehiculo.pago ?? "pendiente",
      propietarioId,
    };

    await prisma.vehiculo.upsert({
      where: { placa: vehiculo.placa },
      create: { placa: vehiculo.placa, ...base },
      update: base,
    });

    const registros = vehiculo.historialKm ?? [];
    const existentes = await prisma.historialKm.count({
      where: { vehiculoId: vehiculo.placa },
    });

    if (existentes === 0 && registros.length > 0) {
      const ahora = Date.now();
      const dia = 24 * 60 * 60 * 1000;

      await prisma.historialKm.createMany({
        data: registros.map((km, indice) => ({
          vehiculoId: vehiculo.placa,
          semana: indice + 1,
          km,
          fecha: new Date(ahora - (registros.length - 1 - indice) * 7 * dia),
        })),
      });
    }
  }

  console.log("Datos iniciales cargados.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
