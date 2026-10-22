import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import Acceso from "@/_Pages/principal/Acceso/Acceso";

export const metadata = {
  title: "Acceso de socios | Drive Mid",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<Acceso />}>
      <Contenido />
    </Suspense>
  );
}

async function Contenido() {
  const usuario = await getSesion();
  if (usuario) {
    redirect("/panel/dashboard");
  }
  return <Acceso />;
}
