"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { iniciarSesionSocio, registrarSocio } from "@/app/acceso/acciones";
import estilos from "./acceso.module.css";

const ESTADO_INICIAL = { error: "" };

export default function Acceso() {
  const [modo, setModo] = useState("login");
  const [estadoLogin, accionLogin, pendienteLogin] = useActionState(
    iniciarSesionSocio,
    ESTADO_INICIAL
  );
  const [estadoRegistro, accionRegistro, pendienteRegistro] = useActionState(
    registrarSocio,
    ESTADO_INICIAL
  );

  return (
    <div className={estilos.pantalla}>
      <div className={estilos.marco}>
        <aside className={estilos.lateral}>
          <Link className={estilos.marca} href="/">
            <span className={estilos.emblema}>
              <Image
                src="/logo_emblema.png"
                alt=""
                width={640}
                height={640}
                priority
              />
            </span>
            <span className={estilos.marcaNombre}>Drive Mid</span>
          </Link>

          <div className={estilos.mensaje}>
            <p className={estilos.kicker}>Acceso de socios</p>
            <h1 className={estilos.titulo}>
              Consulta tu vehículo y tu inversión.
            </h1>
            <p className={estilos.texto}>
              Ingresa con tu cuenta o crea una nueva para dar seguimiento a tu
              inversión.
            </p>
          </div>
        </aside>

        <main className={estilos.formulario}>
          <div className={estilos.form}>
            <Link className={estilos.volver} href="/">
              Volver al sitio
            </Link>

            <div
              className={estilos.pestanas}
              role="tablist"
              aria-label="Acceso de socios"
            >
              <button
                type="button"
                role="tab"
                aria-selected={modo === "login"}
                className={`${estilos.pestana} ${
                  modo === "login" ? estilos.pestanaActiva : ""
                }`}
                onClick={() => setModo("login")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={modo === "registro"}
                className={`${estilos.pestana} ${
                  modo === "registro" ? estilos.pestanaActiva : ""
                }`}
                onClick={() => setModo("registro")}
              >
                Crear cuenta
              </button>
            </div>

            {modo === "login" ? (
              <form className={estilos.formCampos} action={accionLogin}>
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

                {estadoLogin?.error && (
                  <p className={estilos.error}>{estadoLogin.error}</p>
                )}

                <button
                  className="boton boton--solido"
                  type="submit"
                  disabled={pendienteLogin}
                >
                  {pendienteLogin ? "Entrando..." : "Entrar"}
                </button>

                <p className={estilos.pista}>
                  Acceso de prueba: omar@drivemid.com / 123456
                </p>
              </form>
            ) : (
              <form className={estilos.formCampos} action={accionRegistro}>
                <div className={estilos.campo}>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={estilos.campo}>
                  <label htmlFor="correo-registro">Correo</label>
                  <input
                    id="correo-registro"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={estilos.campo}>
                  <label htmlFor="contrasena-registro">Contraseña</label>
                  <input
                    id="contrasena-registro"
                    name="contrasena"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>

                {estadoRegistro?.error && (
                  <p className={estilos.error}>{estadoRegistro.error}</p>
                )}

                <button
                  className="boton boton--solido"
                  type="submit"
                  disabled={pendienteRegistro}
                >
                  {pendienteRegistro ? "Creando cuenta..." : "Crear cuenta"}
                </button>

                <p className={estilos.pista}>
                  Tu cuenta quedará vinculada a tu vehículo cuando el equipo de
                  Drive Mid la asigne.
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
