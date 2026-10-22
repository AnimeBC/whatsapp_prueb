"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BotonCuenta({ className = "boton boton--solido" }) {
  const [usuario, setUsuario] = useState(null);

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

  return (
    <Link
      className={className}
      href={usuario ? "/panel/dashboard" : "/acceso"}
    >
      {usuario ? "Mi cuenta" : "Iniciar sesión"}
    </Link>
  );
}
