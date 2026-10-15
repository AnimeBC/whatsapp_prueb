import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const titulo = Fraunces({
  subsets: ["latin"],
  variable: "--fuente-titulo",
  display: "swap",
});

const datos = Space_Grotesk({
  subsets: ["latin"],
  variable: "--fuente-datos",
  display: "swap",
});

export const metadata = {
  title: "Drive Mid | Movility Fleet",
  description:
    "Drive Mid · Movility Fleet en Mérida, Yucatán. Un modelo de inversión en movilidad estable, con alto rendimiento y mínimo riesgo, monitoreable 24/7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${titulo.variable} ${datos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
