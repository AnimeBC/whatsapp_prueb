"use client";

import { useState } from "react";
import VehiculoAdmin from "@/_Pages/admin/componentes/VehiculoAdmin";
import estilos from "./autosDashboard.module.css";

export default function AutosDashboard({ vehiculos, hoy, semana, admin }) {
  const [autos, setAutos] = useState(vehiculos);

  function actualizar(actualizado) {
    setAutos((prev) =>
      prev.map((v) => (v.placa === actualizado.placa ? actualizado : v))
    );
  }

  return (
    <div className={estilos.lista}>
      {autos.map((vehiculo) => (
        <VehiculoAdmin
          key={vehiculo.placa}
          vehiculo={vehiculo}
          admin={admin}
          hoy={hoy}
          semana={semana}
          onActualizar={actualizar}
        />
      ))}
    </div>
  );
}
