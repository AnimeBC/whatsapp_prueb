import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import { leerDatos } from "@/app/api/almacen";
import { vehiculosParaPanel } from "@/_Pages/admin/datos/panel";
import { ahoraMs } from "@/_Pages/admin/datos/resumen";
import PanelShell from "@/_Pages/admin/componentes/PanelShell";
import Dashboard from "@/_Pages/admin/Dashboard/Dashboard";
import estilos from "@/_Pages/admin/componentes/PanelShell/panelShell.module.css";

export const metadata = {
  title: "Panel | Drive Mid",
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
    redirect("/acceso");
  }

  const datos = await leerDatos();
  const { vehiculos, modoPrueba } = vehiculosParaPanel(usuario, datos);

  return (
    <PanelShell usuario={usuario}>
      <Dashboard
        usuario={usuario}
        vehiculos={vehiculos}
        hoy={ahoraMs()}
        modoPrueba={modoPrueba}
      />
    </PanelShell>
  );
}
