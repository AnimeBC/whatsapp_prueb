import { prisma } from "@/app/api/prisma";

export async function usuarioPorId(id) {
  if (!id) return null;
  return prisma.usuario.findUnique({ where: { id } });
}

export async function usuarioPorCorreo(correo) {
  if (!correo) return null;
  return prisma.usuario.findUnique({
    where: { correo: correo.trim().toLowerCase() },
  });
}

export function sinContrasena(usuario) {
  if (!usuario) return null;
  const { contrasenaHash, ...resto } = usuario;
  return resto;
}

export function serializarVehiculo(vehiculo) {
  if (!vehiculo) return null;

  const historialKm = [...(vehiculo.historialKm ?? [])]
    .reverse()
    .map((registro) => registro.km);

  const aIso = (valor) => {
    if (!valor) return null;
    return valor instanceof Date
      ? valor.toISOString()
      : String(valor);
  };

  return {
    ...vehiculo,
    vigencia: vehiculo.vigencia
      ? aIso(vehiculo.vigencia).slice(0, 10)
      : null,
    creadoEn: aIso(vehiculo.creadoEn),
    actualizadoEn: aIso(vehiculo.actualizadoEn),
    historialKm,
    pagos: vehiculo.pagos ?? [],
  };
}

export async function vehiculosDe(usuario) {
  const donde = usuario.rol === "admin" ? {} : { propietarioId: usuario.id };

  return prisma.vehiculo.findMany({
    where: donde,
    include: {
      historialKm: { orderBy: { fecha: "desc" }, take: 6 },
    },
    orderBy: { placa: "asc" },
  });
}

export async function todosLosVehiculos() {
  return prisma.vehiculo.findMany({
    include: {
      historialKm: { orderBy: { fecha: "desc" }, take: 6 },
    },
    orderBy: { placa: "asc" },
  });
}
