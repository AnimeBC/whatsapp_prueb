import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import { leerDatos } from "@/app/api/almacen";
import { flotaParaPanel } from "@/_Pages/admin/datos/panel";
import { ahoraMs } from "@/_Pages/admin/datos/resumen";
import PanelShell from "@/_Pages/admin/componentes/PanelShell";
import Flota from "@/_Pages/admin/Flota/Flota";
import estilos from "@/_Pages/admin/componentes/PanelShell/panelShell.module.css";

export const metadata = {
  title: "Autos | Drive Mid",
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
  const { propios, otros } = flotaParaPanel(usuario, datos);

  return (
    <PanelShell usuario={usuario}>
      <Flota
        usuario={usuario}
        propios={propios}
        otros={otros}
        hoy={ahoraMs()}
      />
    </PanelShell>
  );
}
