import { calcularResumen } from "@/_Pages/admin/datos/resumen";
import { nf } from "@/_Pages/principal/datos/formato";
import AutosDashboard from "@/_Pages/admin/Dashboard/componentes/AutosDashboard";
import estilos from "./dashboard.module.css";

const INICIO = new Date(2026, 7, 17);
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

export default function Dashboard({ usuario, vehiculos, hoy }) {
  const resumen = calcularResumen(vehiculos, hoy);
  const kpis = [
    { valor: resumen.unidades, etiqueta: "Unidades" },
    { valor: nf.format(resumen.kmTotal), etiqueta: "Km de flota" },
    { valor: resumen.vigentes, etiqueta: "Seguros vigentes" },
    { valor: resumen.pendientes, etiqueta: "Pagos pendientes" },
  ];
  const semanaActual =
    hoy == null
      ? null
      : Math.max(1, Math.floor((hoy - INICIO.getTime()) / SEMANA_MS) + 1);

  return (
    <>
      <div className={estilos.encabezado}>
        <h1 className={estilos.titulo}>Dashboard</h1>
        <p className={estilos.sub}>Resumen de la flota en operación.</p>
      </div>

      <div className={estilos.kpis}>
        {kpis.map((kpi) => (
          <div className={estilos.kpi} key={kpi.etiqueta}>
            <span className={estilos.kpiValor}>{kpi.valor}</span>
            <span className={estilos.kpiEtiqueta}>{kpi.etiqueta}</span>
          </div>
        ))}
      </div>

      <div className={estilos.seccionAutos}>
        <h2 className={estilos.seccionTitulo}>Autos</h2>
        <p className={estilos.seccionTexto}>
          Registro y estadísticas de cada unidad.
        </p>
      </div>
      <AutosDashboard
        vehiculos={vehiculos}
        hoy={hoy}
        semana={semanaActual}
        admin={usuario.rol === "admin"}
      />
    </>
  );
}
