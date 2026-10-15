"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cerrarSesion } from "@/app/admin/acciones";
import estilos from "./panelShell.module.css";

const ENLACES_ADMIN = [
  { href: "/admin/dashboard", texto: "Dashboard" },
  { href: "/admin/flota", texto: "Flota" },
];

const ENLACES_PROPIETARIO = [
  { href: "/admin/dashboard", texto: "Dashboard" },
  { href: "/admin/flota", texto: "Mi vehículo" },
];

export default function PanelShell({ usuario, children }) {
  const pathname = usePathname();
  const esAdmin = usuario.rol === "admin";
  const enlaces = esAdmin ? ENLACES_ADMIN : ENLACES_PROPIETARIO;

  return (
    <div className={estilos.marco}>
      <aside className={estilos.lateral}>
        <div className={estilos.marca}>
          <span className={estilos.emblema}>
            <Image src="/logo_autos.jpg" alt="" width={80} height={80} />
          </span>
          <span className={estilos.marcaNombre}>Drive Mid</span>
        </div>

        <div className={estilos.usuario}>
          <span className={estilos.usuarioNombre}>{usuario.nombre}</span>
          <span className={estilos.usuarioRol}>
            {esAdmin ? "Administrador" : "Propietario"}
          </span>
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
          <a className={estilos.enlaceLateral} href="/">
            Ver sitio
          </a>
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
