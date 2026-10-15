import Image from "next/image";
import estilos from "./modelo.module.css";

export default function Modelo() {
  return (
    <section className="seccion oscuro" id="modelo">
      <div className={`contenedor ${estilos.rejilla}`}>
        <div>
          <p className="kicker">Modelo de negocio</p>
          <h2 className={estilos.titulo}>Capital que se mueve en la ciudad</h2>
          <p className="lead">
            Captamos capital a través de una red estratégica de referencias e
            invertimos directamente en el sector de movilidad en la ciudad de
            Mérida. Este esquema genera un ecosistema de valor que beneficia
            simultáneamente a nuestros socios, empresas aliadas y a la comunidad
            en general.
          </p>
          <p className={estilos.parrafo}>
            Nuestros procesos operativos están diseñados para maximizar la
            eficiencia, detectar áreas de oportunidad en tiempo real y acelerar
            el crecimiento a corto plazo. Respaldamos esta gestión con tecnología
            de monitoreo en vivo, permitiendo a nuestros socios auditar cada
            parámetro de la operación con total certeza y confianza.
          </p>
        </div>

        <figure className={estilos.marco}>
          <Image
            className={estilos.imagen}
            src="/logo_autos.jpg"
            alt="Drive Mid, movilidad y flota en Mérida"
            width={1408}
            height={768}
            sizes="(max-width: 900px) 90vw, 45vw"
          />
          <figcaption className={estilos.pieFoto}>
            Drive Mid, operación y flota en Mérida, Yucatán
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
