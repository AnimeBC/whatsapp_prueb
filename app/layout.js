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

const descripcion =
  "Drive Mid · Movility Fleet en Mérida, Yucatán. Un modelo de inversión en movilidad estable, con alto rendimiento y mínimo riesgo, monitoreable 24/7.";

export const metadata = {
  metadataBase: new URL("https://whatsappprueb.vercel.app"),
  title: "Drive Mid | Movility Fleet",
  description: descripcion,
  applicationName: "Drive Mid",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Drive Mid | Movility Fleet",
    description: descripcion,
    url: "/",
    siteName: "Drive Mid",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/logo_autos.jpg", alt: "Drive Mid" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drive Mid | Movility Fleet",
    description: descripcion,
    images: ["/logo_autos.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${titulo.variable} ${datos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
