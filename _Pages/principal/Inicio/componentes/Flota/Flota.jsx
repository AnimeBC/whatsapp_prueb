"use client";

import { useState, useSyncExternalStore } from "react";
import { FLOTA } from "@/_Pages/principal/datos/flota";
import { nf } from "@/_Pages/principal/datos/formato";
import Vehiculo from "@/_Pages/principal/Inicio/componentes/Flota/componentes/Vehiculo";
import estilos from "./flota.module.css";

const INICIO = new Date(2026, 7, 17);
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

function suscribir(callback) {
  const id = setInterval(callback, 60 * 60 * 1000);
  const alEnfocar = () => callback();
  window.addEventListener("focus", alEnfocar);
  return () => {
    clearInterval(id);
    window.removeEventListener("focus", alEnfocar);
  };
}

function indiceSemana() {
  return Math.max(0, Math.floor((Date.now() - INICIO.getTime()) / SEMANA_MS));
}

function indiceSemanaServidor() {
  return null;
}

const fmtDia = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
});

function rangoSemana(indice) {
  const lunes = new Date(INICIO.getTime() + indice * SEMANA_MS);
  const domingo = new Date(lunes.getTime() + 6 * 24 * 60 * 60 * 1000);
  return `${fmtDia.format(lunes)} al ${fmtDia.format(domingo)}`;
}

export default function Flota() {
  const indice = useSyncExternalStore(
    suscribir,
    indiceSemana,
    indiceSemanaServidor
  );
  const [autos, setAutos] = useState(FLOTA);
  const [valores, setValores] = useState({});

  const semana = indice === null ? null : indice + 1;
  const rango = indice === null ? "" : rangoSemana(indice);
  const referencia =
    indice === null ? null : INICIO.getTime() + indice * SEMANA_MS;

  function registrar(i) {
    const valor = parseInt(valores[i], 10);
    const actual = autos[i].kmTotal;
    if (isNaN(valor) || (actual != null && valor < actual)) {
      alert(
        "El km total debe ser mayor o igual al actual" +
          (actual != null ? ` (${nf.format(actual)})` : "") +
          "."
      );
      return;
    }
    setAutos((prev) =>
      prev.map((a, idx) =>
        idx === i ? { ...a, kmAnterior: a.kmTotal, kmTotal: valor } : a
      )
    );
    setValores((prev) => ({ ...prev, [i]: "" }));
  }

  return (
    <section className="seccion claro" id="flota">
      <div className="contenedor">
        <div className={estilos.cabecera}>
          <div>
            <p className="kicker">Monitoreo</p>
            <h2 className={estilos.titulo}>Nuestra flota</h2>
            <p className="lead">
              Seguimiento semanal de cada vehículo. Al registrar el kilometraje
              total, el sistema calcula el recorrido de la última semana.
            </p>
          </div>

          <div className={estilos.semana}>
            <span className={estilos.semanaNum}>
              Semana {semana ?? "—"}
            </span>
            <span className={estilos.semanaRango}>{rango}</span>
          </div>
        </div>

        <div className={estilos.lista}>
          {autos.map((auto, i) => (
            <Vehiculo
              key={auto.placa}
              auto={auto}
              semana={semana}
              referencia={referencia}
              valor={valores[i] ?? ""}
              onCambio={(v) => setValores((prev) => ({ ...prev, [i]: v }))}
              onRegistrar={() => registrar(i)}
            />
          ))}
        </div>

        <p className={estilos.nota}>
          Datos de placas, pólizas y vigencias reales. Los km, pagos, GPS y
          contactos marcados como pendientes se llenan desde el panel
          administrativo.
        </p>
      </div>
    </section>
  );
}
