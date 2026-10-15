import Encabezado from "@/_Pages/principal/estructuras/Encabezado/Encabezado";
import Pie from "@/_Pages/principal/estructuras/Pie/Pie";
import estilos from "./layout.module.css";

export default function PrincipalLayout({ children }) {
  return (
    <>
      <Encabezado />
      <div className={estilos.contenido}>{children}</div>
      <Pie />
    </>
  );
}
