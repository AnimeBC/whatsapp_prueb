import estilos from "./proceso.module.css";

const PASOS = [
  {
    numero: "01",
    texto: "Meet virtual o presencial para explicar el proyecto.",
  },
  {
    numero: "02",
    texto: "Selección de prospectos a socios.",
  },
  {
    numero: "03",
    texto: "Firma de contrato e inversión.",
  },
  {
    numero: "04",
    texto: "Recibe tu primer rendimiento en 30 días.",
  },
];

export default function Proceso() {
  return (
    <section className={`seccion ${estilos.proceso}`} id="proceso">
      <div className="contenedor">
        <div className={estilos.cabecera}>
          <p className="kicker">Cómo avanzamos</p>
          <h2 className={estilos.titulo}>Proceso 30 días</h2>
          <p className={estilos.lead}>
            Un camino claro, de la primera reunión a tu primer rendimiento.
          </p>
        </div>

        <ol className={estilos.pasos}>
          {PASOS.map((paso) => (
            <li className={estilos.paso} key={paso.numero}>
              <span className={estilos.numero}>{paso.numero}</span>
              <p className={estilos.texto}>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
