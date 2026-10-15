"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import estilos from "./encabezado.module.css";

const SECCIONES = [
  { id: "nosotros", texto: "Nosotros" },
  { id: "modelo", texto: "Modelo" },
  { id: "flota", texto: "Flota" },
  { id: "contacto", texto: "Contacto" },
];

export default function Encabezado() {
  const [activa, setActiva] = useState("inicio");

  useEffect(() => {
    function actualizar() {
      const margen = 150;
      const alFinal =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (alFinal) {
        setActiva(SECCIONES[SECCIONES.length - 1].id);
        return;
      }

      const referencia = window.scrollY + margen;
      let actual = "inicio";
      for (const seccion of SECCIONES) {
        const el = document.getElementById(seccion.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= referencia) {
          actual = seccion.id;
        }
      }
      setActiva(actual);
    }

    const frame = requestAnimationFrame(actualizar);
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, []);

  return (
    <header className={estilos.encabezado}>
      <div className={`contenedor ${estilos.contenido}`}>
        <a className={estilos.marca} href="#inicio">
          <span className={estilos.emblema}>
            <Image
              src="/logo_autos.jpg"
              alt=""
              width={120}
              height={120}
              priority
            />
          </span>
          <span className={estilos.marcaTexto}>
            <span className={estilos.nombre}>Drive Mid</span>
            <span className={estilos.sub}>Movility Fleet</span>
          </span>
        </a>

        <nav className={estilos.nav}>
          {SECCIONES.map((seccion) => (
            <a
              key={seccion.id}
              href={`#${seccion.id}`}
              className={`${estilos.enlace} ${
                activa === seccion.id ? estilos.activo : ""
              }`}
              aria-current={activa === seccion.id ? "location" : undefined}
            >
              {seccion.texto}
            </a>
          ))}
        </nav>

        <a className={`boton ${estilos.cta}`} href="#contacto">
          Agenda tu meet
        </a>
      </div>
    </header>
  );
}
