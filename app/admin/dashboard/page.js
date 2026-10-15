import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import { leerDatos, vehiculosDe } from "@/app/api/almacen";
import { ahoraMs } from "@/_Pages/admin/datos/resumen";
import PanelShell from "@/_Pages/admin/componentes/PanelShell";
import Dashboard from "@/_Pages/admin/Dashboard/Dashboard";
import estilos from "@/_Pages/admin/componentes/PanelShell/panelShell.module.css";

export const metadata = {
  title: "Dashboard | Drive Mid",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div className={estilos.cargando}>Cargando panel...</div>}>
      <Contenido />
    </Suspense>
  );
}

async function Contenido() {
  const usuario = await getSesion();
  if (!usuario) {
    redirect("/admin/login");
  }

  const datos = await leerDatos();
  const vehiculos = vehiculosDe(usuario, datos);

  return (
    <PanelShell usuario={usuario}>
      <Dashboard usuario={usuario} vehiculos={vehiculos} hoy={ahoraMs()} />
    </PanelShell>
  );
}
