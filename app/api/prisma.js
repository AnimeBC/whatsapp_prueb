import { PrismaClient } from "@prisma/client";

const globalParaPrisma = globalThis;

function urlConLimite() {
  const url = process.env.DATABASE_URL;
  if (!url) return url;

  const parametros = [];
  if (!url.includes("connection_limit=")) {
    parametros.push("connection_limit=1");
  }
  if (!url.includes("pool_timeout=")) {
    parametros.push("pool_timeout=20");
  }

  if (parametros.length === 0) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${parametros.join("&")}`;
}

export const prisma =
  globalParaPrisma.prisma ??
  new PrismaClient({ datasourceUrl: urlConLimite() });

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}
