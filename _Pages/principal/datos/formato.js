export const nf = new Intl.NumberFormat("es-MX");

export function fechaCorta(iso) {
  const [anio, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${anio.slice(2)}`;
}

export function enlaceWhatsApp(telefono) {
  return `https://wa.me/${telefono.replace(/\D/g, "")}`;
}
