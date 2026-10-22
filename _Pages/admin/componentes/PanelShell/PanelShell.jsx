"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cerrarSesion } from "@/app/admin/acciones";
import estilos from "./panelShell.module.css";

const ENLACES_ADMIN = [
  { href: "/panel/dashboard", texto: "Dashboard" },
  { href: "/panel/flota", texto: "Autos" },
];

const ENLACES_PROPIETARIO = [
  { href: "/panel/dashboard", texto: "Dashboard" },
  { href: "/panel/flota", texto: "Mi vehículo" },
];

export default function PanelShell({ usuario, children }) {
  const pathname = usePathname();
  const esAdmin = usuario.rol === "admin";
  const enlaces = esAdmin ? ENLACES_ADMIN : ENLACES_PROPIETARIO;
  const inicial = usuario.nombre.trim().charAt(0).toUpperCase();

  return (
    <div className={estilos.marco}>
      <aside className={estilos.lateral}>
        <div className={estilos.marca}>
          <span className={estilos.emblema}>
            <Image src="/logo_emblema.png" alt="" width={640} height={640} />
          </span>
          <span className={estilos.marcaNombre}>Drive Mid</span>
        </div>

        <div className={estilos.usuario}>
          <span className={estilos.avatar} aria-hidden="true">
            {inicial}
          </span>
          <div className={estilos.usuarioInfo}>
            <span className={estilos.usuarioNombre}>{usuario.nombre}</span>
            <span className={estilos.usuarioCorreo}>{usuario.correo}</span>
            <span className={estilos.usuarioRol}>
              {esAdmin ? "Administrador" : "Propietario"}
            </span>
          </div>
        </div>

        <nav className={estilos.menu}>
          {enlaces.map((enlace) => {
            const activo = pathname === enlace.href;
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                className={`${estilos.enlace} ${
                  activo ? estilos.enlaceActivo : ""
                }`}
              >
                {enlace.texto}
              </Link>
            );
          })}
        </nav>

        <div className={estilos.accionesLateral}>
          <Link className={estilos.verSitio} href="/">
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 4h6v6" />
              <path d="M20 4l-8 8" />
              <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
            <span>Ver sitio</span>
          </Link>
          <form action={cerrarSesion}>
            <button className={estilos.salir} type="submit">
              Salir
            </button>
          </form>
        </div>
      </aside>

      <main className={estilos.principal}>{children}</main>
    </div>
  );
}
