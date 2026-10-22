import { calcularResumen } from "@/_Pages/admin/datos/resumen";
import { nf } from "@/_Pages/principal/datos/formato";
import AutosDashboard from "@/_Pages/admin/Dashboard/componentes/AutosDashboard";
import estilos from "./dashboard.module.css";

const INICIO = new Date(2026, 7, 17);
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

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

function Barras({ valores, semanaActual }) {
  const maximo = Math.max(...valores, 1);

  return (
    <div className={estilos.barras}>
      {valores.map((valor, indice) => {
        const etiqueta =
          semanaActual != null
            ? semanaActual - (valores.length - 1 - indice)
            : indice + 1;

        return (
          <div className={estilos.barraCol} key={indice}>
            <span className={estilos.barraValor}>{valor}</span>
            <div className={estilos.barraPista}>
              <div
                className={estilos.barraFill}
                style={{ height: `${Math.max(4, (valor / maximo) * 100)}%` }}
              />
            </div>
            <span className={estilos.barraEtiqueta}>S{etiqueta}</span>
          </div>
        );
      })}
    </div>
  );
}

function Medidor({ porcentaje }) {
  const radio = 52;
  const circunferencia = 2 * Math.PI * radio;
  const desplazamiento = circunferencia * (1 - porcentaje / 100);

  return (
    <svg
      viewBox="0 0 120 120"
      className={estilos.medidor}
      role="img"
      aria-label={`Avance de servicio ${porcentaje}%`}
    >
      <circle cx="60" cy="60" r={radio} className={estilos.medidorPista} />
      <circle
        cx="60"
        cy="60"
        r={radio}
        className={estilos.medidorValor}
        strokeDasharray={circunferencia}
        strokeDashoffset={desplazamiento}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="66" textAnchor="middle" className={estilos.medidorTexto}>
        {porcentaje}%
      </text>
    </svg>
  );
}

export default function Dashboard({
  usuario,
  vehiculos,
  hoy,
  modoPrueba = false,
}) {
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

  if (!esAdmin && vehiculos.length === 0) {
    return (
      <>
        <div className={estilos.encabezado}>
          <h1 className={estilos.titulo}>Dashboard</h1>
          <p className={estilos.sub}>Resumen de tu vehículo.</p>
        </div>
        <p className={estilos.vacio}>
          Tu cuenta está lista. El equipo de Drive Mid vinculará tu vehículo para
          que puedas ver su estado y tu inversión.
        </p>
      </>
    );
  }

  const vehiculo = esAdmin ? null : vehiculos[0];
  const historial = vehiculo?.historialKm ?? [];
  const servicioPct =
    vehiculo?.servicio && vehiculo?.kmTotal != null
      ? Math.min(100, Math.round((vehiculo.kmTotal / vehiculo.servicio) * 100))
      : null;
  const restante =
    vehiculo?.servicio && vehiculo?.kmTotal != null
      ? Math.max(0, vehiculo.servicio - vehiculo.kmTotal)
      : null;
  const semanaActual =
    hoy == null
      ? null
      : Math.max(1, Math.floor((hoy - INICIO.getTime()) / SEMANA_MS) + 1);

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

      {modoPrueba && (
        <div className={estilos.avisoPrueba}>
          <strong>Modo de prueba.</strong> Los datos que ves son de muestra. El
          equipo de Drive Mid vinculará tu unidad real a tu cuenta.
        </div>
      )}

      <div className={estilos.kpis}>
        {kpis.map((kpi) => (
          <div className={estilos.kpi} key={kpi.etiqueta}>
            <span className={estilos.kpiValor}>{kpi.valor}</span>
            <span className={estilos.kpiEtiqueta}>{kpi.etiqueta}</span>
          </div>
        ))}
      </div>

      {esAdmin && (
        <>
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
            admin
          />
        </>
      )}

      {!esAdmin && vehiculo && (
        <div className={estilos.graficos}>
          <section className={estilos.panelGrafico}>
            <div className={estilos.panelCabecera}>
              <h2 className={estilos.panelTitulo}>Recorrido por semana</h2>
              <span className={estilos.panelNota}>km</span>
            </div>

            {historial.length > 0 ? (
              <Barras valores={historial} semanaActual={semanaActual} />
            ) : (
              <p className={estilos.panelVacio}>Sin historial todavía.</p>
            )}
          </section>

          <section className={estilos.panelGrafico}>
            <div className={estilos.panelCabecera}>
              <h2 className={estilos.panelTitulo}>Próximo servicio</h2>
            </div>

            {servicioPct != null ? (
              <div className={estilos.medidorBloque}>
                <Medidor porcentaje={servicioPct} />
                <div>
                  <p className={estilos.medidorRestante}>
                    {nf.format(restante)} km restantes
                  </p>
                  <p className={estilos.medidorMeta}>
                    Servicio a {nf.format(vehiculo.servicio)} km
                  </p>
                </div>
              </div>
            ) : (
              <p className={estilos.panelVacio}>
                Servicio pendiente de definir.
              </p>
            )}
          </section>
        </div>
      )}

      {!esAdmin && (
        <div className={estilos.accesos}>
          <a className={estilos.acceso} href="/panel/flota">
            <span className={estilos.accesoTitulo}>Mi vehículo</span>
            <span className={estilos.accesoTexto}>
              Consulta el detalle de tu unidad.
            </span>
          </a>
        </div>
      )}
    </>
  );
}
