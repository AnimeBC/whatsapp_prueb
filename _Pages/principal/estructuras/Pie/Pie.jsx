"use client";

import { useSyncExternalStore } from "react";
import estilos from "./pie.module.css";

function suscribir(callback) {
  const id = setInterval(callback, 60 * 60 * 1000);
  return () => clearInterval(id);
}

function anioActual() {
  return new Date().getFullYear();
}

function anioServidor() {
  return null;
}

export default function Pie() {
  const anio = useSyncExternalStore(suscribir, anioActual, anioServidor);

  return (
    <footer className={estilos.pie}>
      <div className={`contenedor ${estilos.contenido}`}>
        <span className={estilos.marca}>Drive Mid</span>
        <div className={estilos.derecha}>
          <span className={estilos.meta}>
            Movilidad e inversión en Mérida, Yucatán
          </span>
          <span className={estilos.meta}>© {anio ?? ""}</span>
        </div>
      </div>
    </footer>
  );
}
