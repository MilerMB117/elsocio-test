import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Importa la fuente Poppins
import "./globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recetas App",
  description: "test :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}