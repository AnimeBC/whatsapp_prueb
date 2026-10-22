import { vehiculosDe } from "@/app/api/almacen";

export function vehiculosParaPanel(usuario, datos) {
  const propios = vehiculosDe(usuario, datos);

  if (usuario.rol !== "propietario" || propios.length > 0) {
    return { vehiculos: propios, modoPrueba: false };
  }

  return {
    vehiculos: datos.vehiculos,
    modoPrueba: datos.vehiculos.length > 0,
  };
}

export function flotaParaPanel(usuario, datos) {
  if (usuario.rol === "admin") {
    return { propios: datos.vehiculos, otros: [] };
  }

  const propios = vehiculosDe(usuario, datos);
  const otros = datos.vehiculos.filter(
    (vehiculo) => !usuario.vehiculos.includes(vehiculo.placa)
  );

  return { propios, otros };
}
