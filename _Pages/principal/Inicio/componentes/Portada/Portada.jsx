import Proyeccion from "@/_Pages/principal/Inicio/componentes/Proyeccion";
import estilos from "./portada.module.css";

export default function Portada() {
  return (
    <section className={estilos.portada} id="inicio">
      <div className="contenedor">
        <p className="kicker">Fondo de movilidad en Mérida, Yucatán</p>
        <h1 className={estilos.titulo}>
          Invierte seguro,
          <br />
          invierte en Mérida
        </h1>

        <div className={estilos.fila}>
          <div className={estilos.texto}>
            <p className={estilos.lead}>
              Movility Fleet: buscamos socios para seguir creciendo un modelo
              estable, con alto rendimiento y mínimo riesgo.
            </p>
            <p className={estilos.sub}>
              Lotes, casas y terrenos de oportunidad te generan rendimiento a
              mediano y largo plazo. Con Drive Mid, desde el primer mes obtienes
              ganancias en un esquema confiable y seguro, en el que puedes
              monitorear tu inversión 24/7.
            </p>
          </div>

          <div className={estilos.acciones}>
            <a className="boton boton--solido" href="#contacto">
              Agenda tu meet
            </a>
            <a className="boton" href="#escenarios">
              Conoce las variables
            </a>
          </div>
        </div>

        <div className={estilos.grafica} id="escenarios">
          <Proyeccion />
        </div>
      </div>
    </section>
  );
}
