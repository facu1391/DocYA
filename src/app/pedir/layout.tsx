import type { Metadata } from "next";
import "./pedir.css";

export const metadata: Metadata = {
  title: "Pedí atención médica | DocYa",
  description:
    "Pedí atención cuando la necesitás, sin turnos. Buscamos profesionales disponibles en tiempo real. Médico a domicilio en zonas de cobertura o teleconsulta en Argentina.",
  alternates: { canonical: "/pedir" },
  openGraph: {
    title: "DocYa — Pedí atención médica ahora",
    description: "Atención médica para el momento, sin turnos. Médico a domicilio en zonas de cobertura o teleconsulta desde cualquier lugar de Argentina.",
    url: "/pedir",
  },
};

export default function PedirLayout({ children }: { children: React.ReactNode }) {
  return <div className="pedir-experience">{children}</div>;
}
