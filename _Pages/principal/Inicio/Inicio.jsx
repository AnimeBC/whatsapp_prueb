import Portada from "@/_Pages/principal/Inicio/componentes/Portada";
import Proceso from "@/_Pages/principal/Inicio/componentes/Proceso";
import Nosotros from "@/_Pages/principal/Inicio/componentes/Nosotros";
import Modelo from "@/_Pages/principal/Inicio/componentes/Modelo";
import Flota from "@/_Pages/principal/Inicio/componentes/Flota";
import Contacto from "@/_Pages/principal/Inicio/componentes/Contacto";
import estilos from "./inicio.module.css";

export default function Inicio() {
  return (
    <main className={estilos.pagina}>
      <Portada />
      <Proceso />
      <Nosotros />
      <Modelo />
      <Flota />
      <Contacto />
    </main>
  );
}
