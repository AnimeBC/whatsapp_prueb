import { PrismaClient } from "@prisma/client";

const globalParaPrisma = globalThis;

export const prisma = globalParaPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = prisma;
}
