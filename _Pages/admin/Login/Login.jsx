"use client";

import { useActionState } from "react";
import Image from "next/image";
import { iniciarSesion } from "@/app/admin/acciones";
import estilos from "./login.module.css";

const ESTADO_INICIAL = { error: "" };

export default function Login() {
  const [estado, accion, pendiente] = useActionState(
    iniciarSesion,
    ESTADO_INICIAL
  );

  return (
    <div className={estilos.pantalla}>
      <form className={estilos.tarjeta} action={accion}>
        <div className={estilos.marca}>
          <span className={estilos.emblema}>
            <Image
              src="/logo_autos.jpg"
              alt=""
              width={120}
              height={120}
              priority
            />
          </span>
          <span className={estilos.nombre}>Drive Mid</span>
        </div>

        <h1 className={estilos.titulo}>Panel administrativo</h1>
        <p className={estilos.texto}>
          Ingresa con tu correo y contraseña para ver la flota.
        </p>

        <div className={estilos.campo}>
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            autoComplete="username"
            required
          />
        </div>

        <div className={estilos.campo}>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {estado?.error && <p className={estilos.error}>{estado.error}</p>}

        <button
          className="boton boton--solido"
          type="submit"
          disabled={pendiente}
        >
          {pendiente ? "Entrando..." : "Entrar"}
        </button>

        <p className={estilos.pista}>
          Acceso de prueba: admin@gmail.com / 123456
        </p>
        <a className={estilos.volver} href="/">
          Volver al sitio
        </a>
      </form>
    </div>
  );
}
