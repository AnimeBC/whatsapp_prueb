"use client";

import { useState } from "react";
import {
  nf,
  fechaCorta,
  enlaceWhatsApp,
} from "@/_Pages/principal/datos/formato";
import estilos from "./vehiculoAdmin.module.css";

function ValorWhatsApp({ numero }) {
  if (!numero) return <b className={estilos.pendiente}>Pendiente</b>;
  return (
    <b>
      <a
        className={estilos.enlace}
        href={enlaceWhatsApp(numero)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {numero}
      </a>
    </b>
  );
}

export default function VehiculoAdmin({
  vehiculo,
  admin,
  hoy,
  onActualizar,
}) {
  const [km, setKm] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const activo =
    hoy == null || new Date(vehiculo.vigencia).getTime() >= hoy;
  const semanal =
    vehiculo.kmTotal != null && vehiculo.kmAnterior != null
      ? vehiculo.kmTotal - vehiculo.kmAnterior
      : null;

  async function registrarKm() {
    setError("");
    const valor = parseInt(km, 10);
    const actual = vehiculo.kmTotal ?? 0;
    if (isNaN(valor) || valor < actual) {
      setError(`Debe ser mayor o igual a ${nf.format(actual)} km.`);
      return;
    }
    setGuardando(true);
    const respuesta = await fetch("/api/vehiculos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placa: vehiculo.placa, kmTotal: valor }),
    });
    setGuardando(false);
    if (!respuesta.ok) {
      const data = await respuesta.json().catch(() => ({}));
      setError(data.error || "No se pudo guardar.");
      return;
    }
    const { vehiculo: actualizado } = await respuesta.json();
    onActualizar(actualizado);
    setKm("");
  }

  async function alternarPago() {
    const nuevo = vehiculo.pago === "pagado" ? "pendiente" : "pagado";
    const respuesta = await fetch("/api/vehiculos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placa: vehiculo.placa, pago: nuevo }),
    });
    if (respuesta.ok) {
      const { vehiculo: actualizado } = await respuesta.json();
      onActualizar(actualizado);
    }
  }

  return (
    <article className={estilos.ficha}>
      <header className={estilos.cabecera}>
        <div className={estilos.placa}>
          <span className={estilos.placaEstado}>Yucatán</span>
          <span className={estilos.placaTexto}>{vehiculo.placa}</span>
        </div>

        <div className={estilos.identidad}>
          <h3>{vehiculo.modelo}</h3>
          <p>
            Póliza {vehiculo.poliza} · vence {fechaCorta(vehiculo.vigencia)}
          </p>
        </div>

        <span
          className={`${estilos.estado} ${
            activo ? estilos.ok : estilos.vencido
          }`}
        >
          {activo ? "Seguro vigente" : "Seguro vencido"}
        </span>
      </header>

      <div className={estilos.rejilla}>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>Odómetro total</span>
          <b className={estilos.cifra}>
            {vehiculo.kmTotal != null ? nf.format(vehiculo.kmTotal) : "—"}
            <em>km</em>
          </b>
        </div>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>Recorrido de la semana</span>
          <b className={estilos.cifra}>
            {semanal != null ? nf.format(semanal) : "—"}
            <em>km</em>
          </b>
        </div>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>Próximo servicio</span>
          <b>
            {vehiculo.servicio
              ? `${nf.format(vehiculo.servicio)} km`
              : "Pendiente"}
          </b>
        </div>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>Conductor</span>
          {vehiculo.conductor ? (
            <b>{vehiculo.conductor}</b>
          ) : (
            <b className={estilos.pendiente}>Pendiente</b>
          )}
        </div>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>WhatsApp</span>
          <ValorWhatsApp numero={vehiculo.whatsapp} />
        </div>
        <div className={estilos.dato}>
          <span className={estilos.etiqueta}>Incidencias</span>
          <b>{vehiculo.incidencias}</b>
        </div>
      </div>

      <div className={estilos.pie}>
        <div className={estilos.pagoBloque}>
          <span className={estilos.etiqueta}>Pago del periodo</span>
          {admin ? (
            <button
              className={`${estilos.pago} ${
                vehiculo.pago === "pagado" ? estilos.ok : estilos.pendienteFila
              }`}
              type="button"
              onClick={alternarPago}
            >
              {vehiculo.pago === "pagado" ? "Pagado" : "Pendiente"}
            </button>
          ) : (
            <span
              className={`${estilos.pago} ${
                vehiculo.pago === "pagado" ? estilos.ok : estilos.pendienteFila
              }`}
            >
              {vehiculo.pago === "pagado" ? "Pagado" : "Pendiente"}
            </span>
          )}
        </div>

        {admin && (
          <div className={estilos.registrar}>
            <input
              className={estilos.entrada}
              type="number"
              inputMode="numeric"
              placeholder="Nuevo km total"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
            <button
              className={estilos.boton}
              type="button"
              onClick={registrarKm}
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Registrar km"}
            </button>
          </div>
        )}
      </div>

      {error && <p className={estilos.error}>{error}</p>}
    </article>
  );
}
