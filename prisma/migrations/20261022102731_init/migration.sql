-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenaHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'propietario',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "poliza" TEXT,
    "vigencia" TIMESTAMP(3),
    "conductor" TEXT,
    "whatsapp" TEXT,
    "familiar" TEXT,
    "gps" TEXT,
    "incidencias" TEXT,
    "servicio" INTEGER,
    "kmAnterior" INTEGER,
    "kmTotal" INTEGER,
    "semanaCirculacion" INTEGER NOT NULL DEFAULT 0,
    "pago" TEXT NOT NULL DEFAULT 'pendiente',
    "propietarioId" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("placa")
);

-- CreateTable
CREATE TABLE "HistorialKm" (
    "id" TEXT NOT NULL,
    "vehiculoId" TEXT NOT NULL,
    "semana" INTEGER,
    "km" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialKm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" TEXT NOT NULL,
    "vehiculoId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "monto" INTEGER NOT NULL DEFAULT 0,
    "estatus" TEXT NOT NULL DEFAULT 'pendiente',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE INDEX "Vehiculo_propietarioId_idx" ON "Vehiculo"("propietarioId");

-- CreateIndex
CREATE INDEX "HistorialKm_vehiculoId_fecha_idx" ON "HistorialKm"("vehiculoId", "fecha");

-- CreateIndex
CREATE INDEX "Pago_vehiculoId_fecha_idx" ON "Pago"("vehiculoId", "fecha");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialKm" ADD CONSTRAINT "HistorialKm_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("placa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo"("placa") ON DELETE CASCADE ON UPDATE CASCADE;
