import estilos from "./proyeccion.module.css";

const CAPITAL = 100000;
const MESES = 12;

const ESCENARIOS = [
  { nombre: "Óptimo", anual: 0.42, color: "#c1a45a", grosor: 2.6 },
  { nombre: "Base", anual: 0.3, color: "#9aa4b0", grosor: 1.7 },
  { nombre: "Catastrófico", anual: 0.18, color: "#67727f", grosor: 1.7 },
];

const ANCHO = 680;
const ALTO = 440;
const IZQ = 68;
const DER = 122;
const ARRIBA = 44;
const ABAJO = 58;
const X0 = IZQ;
const X1 = ANCHO - DER;
const Y0 = ALTO - ABAJO;
const Y1 = ARRIBA;
const VMIN = 100000;
const VMAX = 144000;

const ejeX = (t) => X0 + (t / MESES) * (X1 - X0);
const ejeY = (v) => Y0 - ((v - VMIN) / (VMAX - VMIN)) * (Y0 - Y1);

function serie(anual) {
  const mensual = Math.pow(1 + anual, 1 / MESES) - 1;
  return Array.from({ length: MESES + 1 }, (_, t) => ({
    t,
    v: Math.round(CAPITAL * Math.pow(1 + mensual, t)),
  }));
}

const lineasY = [100000, 110000, 120000, 130000, 140000];
const pasosX = [0, 3, 6, 9, 12];

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const datos = ESCENARIOS.map((e) => {
  const puntos = serie(e.anual);
  return {
    ...e,
    puntos,
    final: puntos[puntos.length - 1].v,
    polyline: puntos.map((p) => `${ejeX(p.t)},${ejeY(p.v)}`).join(" "),
  };
});

export default function Proyeccion() {
  const areaOptimo = `${X0},${Y0} ${datos[0].polyline} ${X1},${Y0}`;

  return (
    <div className={estilos.panel}>
      <div className={estilos.cabecera}>
        <h3 className={estilos.titulo}>
          Proyección de {mxn.format(CAPITAL)}
        </h3>
        <p className={estilos.nota}>Rendimiento compuesto a 12 meses</p>
      </div>

      <svg
        className={estilos.grafica}
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        role="img"
        aria-label="Proyección del capital a 12 meses en tres escenarios: óptimo 42 por ciento, base 30 por ciento y catastrófico 18 por ciento."
      >
        {lineasY.map((v) => (
          <g key={v}>
            <line
              x1={X0}
              x2={X1}
              y1={ejeY(v)}
              y2={ejeY(v)}
              className={estilos.grid}
            />
            <text
              x={X0 - 12}
              y={ejeY(v) + 4}
              className={estilos.etiquetaY}
              textAnchor="end"
            >
              {v / 1000}k
            </text>
          </g>
        ))}

        <line x1={X0} x2={X1} y1={Y0} y2={Y0} className={estilos.base} />

        {pasosX.map((t) => (
          <text
            key={t}
            x={ejeX(t)}
            y={Y0 + 26}
            className={estilos.etiquetaX}
            textAnchor="middle"
          >
            {t}
          </text>
        ))}
        <text
          x={(X0 + X1) / 2}
          y={ALTO - 12}
          className={estilos.ejeTitulo}
          textAnchor="middle"
        >
          meses
        </text>

        <polygon points={areaOptimo} className={estilos.area} />

        {datos.map((d) => (
          <polyline
            key={d.nombre}
            points={d.polyline}
            fill="none"
            stroke={d.color}
            strokeWidth={d.grosor}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {datos.map((d) => {
          const ultimo = d.puntos[d.puntos.length - 1];
          return (
            <g key={d.nombre}>
              <circle
                cx={ejeX(ultimo.t)}
                cy={ejeY(ultimo.v)}
                r="3.6"
                fill={d.color}
              />
              <text
                x={X1 + 14}
                y={ejeY(ultimo.v) - 1}
                className={estilos.etiquetaLinea}
                fill={d.color}
              >
                +{Math.round(d.anual * 100)}%
              </text>
              <text
                x={X1 + 14}
                y={ejeY(ultimo.v) + 15}
                className={estilos.nombreLinea}
              >
                {d.nombre}
              </text>
            </g>
          );
        })}
      </svg>

      <table className={estilos.tabla}>
        <thead>
          <tr>
            <th>Escenario</th>
            <th>Anual</th>
            <th>A 12 meses</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.nombre}>
              <td>
                <span
                  className={estilos.muestra}
                  style={{ background: d.color }}
                />
                {d.nombre}
              </td>
              <td>+{Math.round(d.anual * 100)}%</td>
              <td>{mxn.format(d.final)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
