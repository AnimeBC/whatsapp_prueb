export const nf = new Intl.NumberFormat("es-MX");

export function fechaCorta(valor) {
  if (!valor) return "Pendiente";

  const iso =
    valor instanceof Date
      ? valor.toISOString().slice(0, 10)
      : String(valor).slice(0, 10);

  const [anio, mes, dia] = iso.split("-");

  if (!anio || !mes || !dia) return "Pendiente";

  return `${dia}/${mes}/${anio.slice(2)}`;
}

export function enlaceWhatsApp(telefono) {
  return `https://wa.me/${telefono.replace(/\D/g, "")}`;
}
