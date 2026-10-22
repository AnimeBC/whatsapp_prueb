export function vehiculosParaPanel(usuario, vehiculos) {
  if (usuario.rol === "admin") {
    return { vehiculos, modoPrueba: false };
  }

  const propios = vehiculos.filter(
    (vehiculo) => vehiculo.propietarioId === usuario.id
  );

  if (propios.length > 0) {
    return { vehiculos: propios, modoPrueba: false };
  }

  return {
    vehiculos,
    modoPrueba: vehiculos.length > 0,
  };
}

export function flotaParaPanel(usuario, vehiculos) {
  if (usuario.rol === "admin") {
    return { propios: vehiculos, otros: [] };
  }

  return {
    propios: vehiculos.filter(
      (vehiculo) => vehiculo.propietarioId === usuario.id
    ),
    otros: vehiculos.filter(
      (vehiculo) => vehiculo.propietarioId !== usuario.id
    ),
  };
}
