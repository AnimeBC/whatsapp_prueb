"use client";

import { useState } from "react";
import estilos from "./contacto.module.css";

const TELEFONO = "+52 999 111 8219";
const WHATSAPP = "529991118219";
const DIRECCION = "Plaza San Juan Bautista, Gran Santa Fe, Mérida, Yucatán";
const MAPA = `https://www.google.com/maps?q=${encodeURIComponent(
  DIRECCION
)}&hl=es&z=15&output=embed`;

export default function Contacto() {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    cuando: "",
    mensaje: "",
  });

  function cambiar(campo) {
    return (e) => setDatos((prev) => ({ ...prev, [campo]: e.target.value }));
  }

  function enviar(e) {
    e.preventDefault();
    const texto = [
      "Hola, quiero agendar un meet con Drive Mid.",
      "",
      `Nombre: ${datos.nombre}`,
      `Teléfono: ${datos.telefono}`,
      `Me acomoda: ${datos.cuando || "por definir"}`,
      `Mensaje: ${datos.mensaje || "sin mensaje"}`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <section className="seccion oscuro" id="contacto">
      <div className="contenedor">
        <div className={estilos.encabezado}>
          <p className="kicker">Contacto</p>
          <h2 className={estilos.titulo}>Agenda tu meet</h2>
          <p className="lead">
            Déjanos tus datos y te contactamos para revisar juntos las variables
            del modelo.
          </p>
        </div>

        <div className={estilos.rejilla}>
          <form className={estilos.formulario} onSubmit={enviar}>
            <div className={estilos.pareja}>
              <div className={estilos.campo}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  value={datos.nombre}
                  onChange={cambiar("nombre")}
                />
              </div>
              <div className={estilos.campo}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={datos.telefono}
                  onChange={cambiar("telefono")}
                />
              </div>
            </div>

            <div className={estilos.campo}>
              <label htmlFor="cuando">¿Cuándo te acomoda?</label>
              <input
                id="cuando"
                type="text"
                placeholder="Por ejemplo, martes por la tarde"
                value={datos.cuando}
                onChange={cambiar("cuando")}
              />
            </div>

            <div className={estilos.campo}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                rows={3}
                value={datos.mensaje}
                onChange={cambiar("mensaje")}
              />
            </div>

            <button className="boton boton--solido" type="submit">
              Enviar por WhatsApp
            </button>
            <p className={estilos.aviso}>
              Al enviar se abre WhatsApp con tu solicitud lista para mandar.
            </p>
          </form>

          <div className={estilos.lateral}>
            <div className={estilos.datos}>
              <div className={estilos.item}>
                <span className={estilos.etiqueta}>Teléfono y WhatsApp</span>
                <a className={estilos.valor} href={`tel:+${WHATSAPP}`}>
                  {TELEFONO}
                </a>
              </div>
              <div className={estilos.item}>
                <span className={estilos.etiqueta}>Correo</span>
                <a className={estilos.valor} href="mailto:info@drivemid.com">
                  info@drivemid.com
                </a>
              </div>
              <div className={estilos.item}>
                <span className={estilos.etiqueta}>Ubicación</span>
                <span className={estilos.valor}>{DIRECCION}</span>
              </div>
            </div>

            <div className={estilos.mapa}>
              <iframe
                className={estilos.iframe}
                src={MAPA}
                title="Ubicación de Drive Mid en Mérida, Yucatán"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
