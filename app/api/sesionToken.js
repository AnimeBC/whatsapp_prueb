import { SignJWT, jwtVerify } from "jose";

function secreto() {
  const valor = process.env.JWT_SECRET;

  if (!valor) {
    throw new Error("Falta JWT_SECRET en el archivo .env");
  }

  return new TextEncoder().encode(valor);
}

export const OPCIONES_COOKIE = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 8,
};

export async function crearToken(usuario) {
  return new SignJWT({ id: usuario.id, rol: usuario.rol })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secreto());
}

export async function verificarToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secreto());
    return payload;
  } catch {
    return null;
  }
}
