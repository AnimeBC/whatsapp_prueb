import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSesion } from "@/_Pages/admin/datos/sesion";
import Login from "@/_Pages/admin/Login/Login";

export const metadata = {
  title: "Acceso administrador | Drive Mid",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<Login />}>
      <Contenido />
    </Suspense>
  );
}

async function Contenido() {
  const usuario = await getSesion();
  if (usuario) {
    redirect("/panel/dashboard");
  }
  return <Login />;
}
