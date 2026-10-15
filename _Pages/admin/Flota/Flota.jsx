"use client";

import { useState } from "react";
import VehiculoAdmin from "@/_Pages/admin/componentes/VehiculoAdmin";
import estilos from "./flota.module.css";

export default function Flota({ usuario, vehiculos: iniciales, hoy }) {
  const [vehiculos, setVehiculos] = useState(iniciales);
  const esAdmin = usuario.rol === "admin";

  function actualizarVehiculo(actualizado) {
    setVehiculos((prev) =>
      prev.map((v) => (v.placa === actualizado.placa ? actualizado : v))
    );
  }

  return (
    <>
      <div className={estilos.encabezado}>
        <h1 className={estilos.titulo}>{esAdmin ? "Flota" : "Mi vehículo"}</h1>
        <p className={estilos.sub}>
          {esAdmin
            ? `${vehiculos.length} vehículos en operación.`
            : "Estado de tu vehículo."}
        </p>
      </div>

      <div className={estilos.lista}>
        {vehiculos.map((vehiculo) => (
          <VehiculoAdmin
            key={vehiculo.placa}
            vehiculo={vehiculo}
            admin={esAdmin}
            hoy={hoy}
            onActualizar={actualizarVehiculo}
          />
        ))}
      </div>
    </>
  );
}
