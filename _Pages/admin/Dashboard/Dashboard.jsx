import { calcularResumen } from "@/_Pages/admin/datos/resumen";
import { nf } from "@/_Pages/principal/datos/formato";
import estilos from "./dashboard.module.css";

function kpisPropietario(vehiculo, hoy) {
  if (!vehiculo) {
    return [];
  }

  const vigente = new Date(vehiculo.vigencia).getTime() >= hoy;
  const semanal =
    vehiculo.kmTotal != null && vehiculo.kmAnterior != null
      ? vehiculo.kmTotal - vehiculo.kmAnterior
      : null;

  return [
    {
      valor:
        vehiculo.kmTotal != null ? nf.format(vehiculo.kmTotal) : "—",
      etiqueta: "Odómetro total (km)",
    },
    {
      valor: semanal != null ? nf.format(semanal) : "—",
      etiqueta: "Recorrido de la semana (km)",
    },
    { valor: vigente ? "Vigente" : "Vencido", etiqueta: "Seguro" },
    {
      valor: vehiculo.pago === "pagado" ? "Pagado" : "Pendiente",
      etiqueta: "Pago del periodo",
    },
  ];
}

export default function Dashboard({ usuario, vehiculos, hoy }) {
  const esAdmin = usuario.rol === "admin";
  const resumen = calcularResumen(vehiculos, hoy);

  const kpis = esAdmin
    ? [
        { valor: resumen.unidades, etiqueta: "Unidades" },
        { valor: nf.format(resumen.kmTotal), etiqueta: "Km de flota" },
        { valor: resumen.vigentes, etiqueta: "Seguros vigentes" },
        { valor: resumen.pendientes, etiqueta: "Pagos pendientes" },
      ]
    : kpisPropietario(vehiculos[0], hoy);

  return (
    <>
      <div className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Dashboard</h1>
        <p className={estilos.sub}>
          {esAdmin
            ? "Resumen de la flota en operación."
            : "Resumen de tu vehículo."}
        </p>
      </div>

      <div className={estilos.kpis}>
        {kpis.map((kpi) => (
          <div className={estilos.kpi} key={kpi.etiqueta}>
            <span className={estilos.kpiValor}>{kpi.valor}</span>
            <span className={estilos.kpiEtiqueta}>{kpi.etiqueta}</span>
          </div>
        ))}
      </div>

      {esAdmin && (
        <div className={estilos.accesos}>
          <a className={estilos.acceso} href="/admin/flota">
            <span className={estilos.accesoTitulo}>Flota</span>
            <span className={estilos.accesoTexto}>
              Ver y actualizar los {resumen.unidades} vehículos.
            </span>
          </a>
        </div>
      )}
    </>
  );
}
