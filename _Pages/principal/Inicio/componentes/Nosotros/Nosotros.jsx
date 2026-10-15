import estilos from "./nosotros.module.css";

const PILARES = [
  {
    titulo: "Misión",
    texto:
      "Optimizar procesos y dar un seguimiento riguroso a cada operación para garantizar su éxito, impulsando el crecimiento financiero de nuestros aliados comerciales.",
  },
  {
    titulo: "Visión",
    texto:
      "Posicionarnos como el fondo de gestión e inversión en movilidad líder en la región, reconocidos por la transparencia, la innovación operativa y el impacto en la comunidad.",
  },
  {
    titulo: "Respaldo",
    texto:
      "Tecnología de monitoreo en vivo para que nuestros socios auditen cada parámetro de la operación con total certeza y confianza.",
  },
];

const VALORES = [
  {
    titulo: "Compromiso",
    texto: "Dedicación total en la gestión y cumplimiento de objetivos.",
  },
  {
    titulo: "Responsabilidad",
    texto: "Manejo ético y riguroso del capital depositado.",
  },
  {
    titulo: "Puntualidad",
    texto: "Eficiencia en los tiempos de entrega y retornos.",
  },
  {
    titulo: "Transparencia",
    texto: "Claridad absoluta en cada etapa del proceso.",
  },
];

export default function Nosotros() {
  return (
    <section className="seccion claro" id="nosotros">
      <div className="contenedor">
        <p className="kicker">Información general</p>
        <h2 className={estilos.titulo}>Quiénes somos</h2>
        <p className="lead">
          Somos un equipo especializado en la gestión y administración
          estratégica de recursos, enfocado en generar rendimientos estables y
          sostenibles para nuestros socios e inversionistas.
        </p>

        <div className={estilos.pilares}>
          {PILARES.map((p) => (
            <article className={estilos.pilar} key={p.titulo}>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </article>
          ))}
        </div>

        <div className={estilos.valoresBloque}>
          <h3 className={estilos.valoresTitulo}>Nuestros valores</h3>
          <dl className={estilos.valores}>
            {VALORES.map((v) => (
              <div className={estilos.valor} key={v.titulo}>
                <dt>{v.titulo}</dt>
                <dd>{v.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
