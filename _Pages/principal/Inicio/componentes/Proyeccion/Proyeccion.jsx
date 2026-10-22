import Image from "next/image";
import estilos from "./proyeccion.module.css";

const ESCENARIOS = [
  {
    titulo: "Escenarios optimistas",
    detalle: "sin paros",
    avance: 90,
    roi: "38% - 42% ROI",
  },
  {
    titulo: "Escenarios base",
    detalle: "85% ocupación",
    avance: 65,
    roi: "24% - 28% ROI",
  },
  {
    titulo: "Escenario conservador",
    detalle: "estrés",
    avance: 40,
    roi: "14% - 18% ROI",
  },
];

export default function Proyeccion() {
  return (
    <section className={estilos.slide} aria-label="Escenarios de rendimiento">
      <div className={estilos.banda}>
        <span className={estilos.emblema}>
          <Image src="/logo_autos.jpg" alt="" width={80} height={80} />
        </span>
        <span className={estilos.bandaTexto}>Drive Mid</span>
      </div>

      <div className={estilos.contenido}>
        <header className={estilos.cabecera}>
          <h2 className={estilos.titulo}>Escenarios de rendimiento</h2>
        </header>

        <div className={estilos.escenarios}>
          {ESCENARIOS.map((escenario) => (
            <div className={estilos.escenario} key={escenario.titulo}>
              <div className={estilos.etiquetaFila}>
                <span className={estilos.etiqueta}>
                  {escenario.titulo}
                  <em>({escenario.detalle})</em>
                </span>
                <span className={estilos.roi}>{escenario.roi}</span>
              </div>

              <div
                className={estilos.pista}
                role="progressbar"
                aria-valuenow={escenario.avance}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${escenario.titulo}, ${escenario.roi}`}
              >
                <div
                  className={estilos.barra}
                  style={{ width: `${escenario.avance}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <footer className={estilos.pie}>
          <span>
            Nota: rendimiento anual CETES BBVA 11.0% a 12.1%
          </span>
        </footer>
      </div>
    </section>
  );
}
