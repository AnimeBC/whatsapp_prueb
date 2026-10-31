"use client";

import { useState } from "react";
import VehiculoAdmin from "@/_Pages/admin/componentes/VehiculoAdmin";
import estilos from "./flota.module.css";

const INICIO = new Date(2026, 7, 17);
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;
const POR_PAGINA = 2;
const fmtDia = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
});

function filtrar(vehiculos, busqueda) {
  const texto = busqueda.trim().toLowerCase();
  if (!texto) return vehiculos;
  return vehiculos.filter(
    (vehiculo) =>
      vehiculo.placa.toLowerCase().includes(texto) ||
      vehiculo.modelo.toLowerCase().includes(texto)
  );
}

function paginar(vehiculos, pagina) {
  const totalPaginas = Math.max(1, Math.ceil(vehiculos.length / POR_PAGINA));
  const paginaActual = Math.min(Math.max(1, pagina), totalPaginas);
  const inicio = (paginaActual - 1) * POR_PAGINA;

  return {
    totalPaginas,
    paginaActual,
    items: vehiculos.slice(inicio, inicio + POR_PAGINA),
  };
}

function ListaVehiculos({
  titulo,
  descripcion,
  vehiculos,
  esAdmin,
  hoy,
  semana,
  onActualizar,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtrados = filtrar(vehiculos, busqueda);
  const { items, totalPaginas, paginaActual } = paginar(filtrados, pagina);

  function cambiarBusqueda(valor) {
    setBusqueda(valor);
    setPagina(1);
  }

  return (
    <section className={estilos.grupo}>
      <div className={estilos.grupoCabecera}>
        <div>
          {titulo && <h2 className={estilos.grupoTitulo}>{titulo}</h2>}
          <p className={estilos.grupoDescripcion}>{descripcion}</p>
        </div>
        <input
          className={estilos.buscador}
          type="search"
          placeholder="Buscar por placa o modelo"
          value={busqueda}
          onChange={(e) => cambiarBusqueda(e.target.value)}
          aria-label={`Buscar en ${titulo ?? "la lista"}`}
        />
      </div>

      {items.length === 0 ? (
        <p className={estilos.vacio}>
          {vehiculos.length === 0
            ? "No hay vehículos en esta sección."
            : "No se encontraron vehículos con esa búsqueda."}
        </p>
      ) : (
        <div className={estilos.lista}>
          {items.map((vehiculo) => (
            <VehiculoAdmin
              key={vehiculo.placa}
              vehiculo={vehiculo}
              admin={esAdmin}
              hoy={hoy}
              semana={semana}
              onActualizar={onActualizar}
            />
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className={estilos.paginacion}>
          <button
            type="button"
            className={estilos.paginaBoton}
            onClick={() => setPagina(paginaActual - 1)}
            disabled={paginaActual <= 1}
          >
            Anterior
          </button>
          <span className={estilos.paginaInfo}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            type="button"
            className={estilos.paginaBoton}
            onClick={() => setPagina(paginaActual + 1)}
            disabled={paginaActual >= totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default function Flota({ usuario, propios, hoy }) {
  const [mios, setMios] = useState(propios);
  const esAdmin = usuario.rol === "admin";

  const indice =
    hoy == null
      ? 0
      : Math.max(0, Math.floor((hoy - INICIO.getTime()) / SEMANA_MS));
  const semana = indice + 1;
  const lunes = new Date(INICIO.getTime() + indice * SEMANA_MS);
  const domingo = new Date(lunes.getTime() + 6 * 24 * 60 * 60 * 1000);
  const rango = `${fmtDia.format(lunes)} al ${fmtDia.format(domingo)}`;

  function actualizarVehiculo(actualizado) {
    setMios((prev) =>
      prev.map((v) => (v.placa === actualizado.placa ? actualizado : v))
    );
  }

  return (
    <>
      <div className={estilos.cabecera}>
        <div>
          <p className="kicker">Monitoreo</p>
          <h1 className={estilos.titulo}>Autos</h1>
          <p className={estilos.lead}>
            Seguimiento 24/7 en tiempo real, para mayor confianza y certeza de
            que tu capital está 100% seguro y generando rendimientos.
          </p>
        </div>

        <div className={estilos.semana}>
          <span className={estilos.semanaNum}>Semana {semana}</span>
          <span className={estilos.semanaRango}>{rango}</span>
        </div>
      </div>

      <ListaVehiculos
        titulo="Autos"
        descripcion="Vehículos en operación."
        vehiculos={mios}
        esAdmin={esAdmin}
        hoy={hoy}
        semana={semana}
        onActualizar={actualizarVehiculo}
      />
    </>
  );
}
