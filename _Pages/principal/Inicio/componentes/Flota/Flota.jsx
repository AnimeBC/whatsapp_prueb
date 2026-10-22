import Link from "next/link";
import { leerDatos } from "@/app/api/almacen";
import { nf } from "@/_Pages/principal/datos/formato";
import BotonCuenta from "@/_Pages/principal/componentes/BotonCuenta";
import estilos from "./flota.module.css";

async function obtenerFlotaPublica() {
  "use cache";
  const datos = await leerDatos();
  return datos.vehiculos.map((vehiculo) => ({
    placa: vehiculo.placa,
    modelo: vehiculo.modelo,
    semanaCirculacion: vehiculo.semanaCirculacion,
    servicio: vehiculo.servicio,
  }));
}

export default async function Flota() {
  const vehiculos = await obtenerFlotaPublica();

  return (
    <section className="seccion claro" id="flota">
      <div className="contenedor">
        <div className={estilos.cabecera}>
          <p className="kicker">Monitoreo</p>
          <h2 className={estilos.titulo}>Nuestra Flota</h2>
          <p className={estilos.lead}>
            Seguimiento 24/7 en tiempo real, para mayor confianza y certeza de
            que tu capital está 100% seguro y generando rendimientos.
          </p>
        </div>

        <div className={estilos.lista}>
          {vehiculos.map((vehiculo) => (
            <Link
              className={estilos.unidad}
              href={`/panel/flota#${vehiculo.placa}`}
              key={vehiculo.placa}
            >
              <div className={estilos.cabeceraUnidad}>
                <span className={estilos.placa}>
                  <span className={estilos.placaEstado}>Yucatán</span>
                  <span className={estilos.placaTexto}>{vehiculo.placa}</span>
                </span>
                <span className={estilos.operacion}>En operación</span>
              </div>

              <h3 className={estilos.modelo}>{vehiculo.modelo}</h3>

              <dl className={estilos.datos}>
                <div>
                  <dt>Semana en circulación</dt>
                  <dd>{vehiculo.semanaCirculacion ?? "—"}</dd>
                </div>
                <div>
                  <dt>Próximo servicio</dt>
                  <dd>
                    {vehiculo.servicio
                      ? `${nf.format(vehiculo.servicio)} km`
                      : "Pendiente"}
                  </dd>
                </div>
              </dl>

              <span className={estilos.verDetalle}>Ver detalle</span>
            </Link>
          ))}
        </div>

        <div className={estilos.pie}>
          <p className={estilos.nota}>
            El kilometraje, el conductor, el seguro y los pagos de cada unidad se
            consultan en el panel privado.
          </p>
          <BotonCuenta />
        </div>
      </div>
    </section>
  );
}
