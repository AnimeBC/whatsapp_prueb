import BotonCuenta from "@/_Pages/principal/componentes/BotonCuenta";
import estilos from "./flota.module.css";

const ICONOS = {
  km: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 14l4-4" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  seguro: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  conductor: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c.8-3.4 3.6-5.4 7-5.4s6.2 2 7 5.4" />
    </svg>
  ),
  pagos: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  ),
};

const PUNTOS = [
  {
    icono: "km",
    titulo: "Kilometraje",
    texto: "Registro semanal y cálculo automático del recorrido de cada unidad.",
  },
  {
    icono: "seguro",
    titulo: "Seguro",
    texto: "Vigencia y estatus de la póliza de cada vehículo.",
  },
  {
    icono: "conductor",
    titulo: "Conductor",
    texto: "Datos y contacto directo de quien opera la unidad.",
  },
  {
    icono: "pagos",
    titulo: "Pagos",
    texto: "Control de pagos y rendimientos por periodo.",
  },
];

export default function Flota() {
  return (
    <section className="seccion claro" id="flota">
      <div className="contenedor">
        <div className={estilos.cabecera}>
          <p className="kicker">Monitoreo</p>
          <h2 className={estilos.titulo}>Nuestra Flota</h2>
          <p className={estilos.lead}>
            Seguimiento 24/7 en tiempo real, para mayor confianza y certeza de
            que tu capital está 100% seguro y generando rendimientos.
          </p>
        </div>

        <ol className={estilos.puntos}>
          {PUNTOS.map((punto) => (
            <li className={estilos.punto} key={punto.titulo}>
              <span className={estilos.icono} aria-hidden="true">
                {ICONOS[punto.icono]}
              </span>
              <h3 className={estilos.puntoTitulo}>{punto.titulo}</h3>
              <p className={estilos.puntoTexto}>{punto.texto}</p>
            </li>
          ))}
        </ol>

        <div className={estilos.pie}>
          <p className={estilos.nota}>
            El detalle de cada unidad se consulta en el panel privado.
          </p>
          <BotonCuenta />
        </div>
      </div>
    </section>
  );
}
