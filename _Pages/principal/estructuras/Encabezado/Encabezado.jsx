"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cerrarSesion } from "@/app/admin/acciones";
import estilos from "./encabezado.module.css";

const SECCIONES = [
  { id: "nosotros", texto: "Nosotros" },
  { id: "modelo", texto: "Modelo" },
  { id: "flota", texto: "Flota" },
  { id: "contacto", texto: "Contacto" },
];

export default function Encabezado() {
  const [activa, setActiva] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cuentaRef = useRef(null);

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

  useEffect(() => {
    let activo = true;

    fetch("/api/sesion", { cache: "no-store" })
      .then((respuesta) =>
        respuesta.ok ? respuesta.json() : { usuario: null }
      )
      .then((datos) => {
        if (activo) setUsuario(datos.usuario);
      })
      .catch(() => {});

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!menuAbierto) return;

    function alClicFuera(evento) {
      if (cuentaRef.current && !cuentaRef.current.contains(evento.target)) {
        setMenuAbierto(false);
      }
    }

    function alEscape(evento) {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("mousedown", alClicFuera);
    document.addEventListener("keydown", alEscape);
    return () => {
      document.removeEventListener("mousedown", alClicFuera);
      document.removeEventListener("keydown", alEscape);
    };
  }, [menuAbierto]);

  return (
    <header className={estilos.encabezado}>
      <div className={`contenedor ${estilos.contenido}`}>
        <a className={estilos.marca} href="#inicio">
          <span className={estilos.emblema}>
            <Image
              src="/logo_emblema.png"
              alt=""
              width={640}
              height={640}
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

        {usuario ? (
          <div className={estilos.cuenta} ref={cuentaRef}>
            <button
              type="button"
              className={estilos.cuentaBoton}
              onClick={() => setMenuAbierto((valor) => !valor)}
              aria-expanded={menuAbierto}
              aria-haspopup="menu"
            >
              <span className={estilos.avatar} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M4.8 20c.9-3.6 3.8-5.6 7.2-5.6s6.3 2 7.2 5.6" />
                </svg>
              </span>
              <span className={estilos.cuentaNombre}>{usuario.nombre}</span>
              <span
                className={`${estilos.flecha} ${
                  menuAbierto ? estilos.flechaArriba : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {menuAbierto && (
              <div className={estilos.menu} role="menu">
                <Link
                  className={estilos.menuItem}
                  href="/panel/dashboard"
                  role="menuitem"
                  onClick={() => setMenuAbierto(false)}
                >
                  Mi cuenta
                </Link>
                <form action={cerrarSesion}>
                  <button
                    className={estilos.menuItem}
                    type="submit"
                    role="menuitem"
                  >
                    Salir
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <Link className={`boton ${estilos.cta}`} href="/acceso">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
