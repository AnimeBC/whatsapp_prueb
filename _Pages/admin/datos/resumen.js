export function ahoraMs() {
  return Date.now();
}

export function calcularResumen(vehiculos, hoy) {
  const unidades = vehiculos.length;
  const kmTotal = vehiculos.reduce((total, v) => total + (v.kmTotal || 0), 0);
  const vigentes = vehiculos.filter(
    (v) => new Date(v.vigencia).getTime() >= hoy
  ).length;
  const pendientes = vehiculos.filter((v) => v.pago !== "pagado").length;

  return { unidades, kmTotal, vigentes, pendientes };
}
