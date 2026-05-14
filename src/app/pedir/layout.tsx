import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedí atención médica | DocYa",
  description:
    "Solicitá un médico a domicilio, una teleconsulta o un enfermero desde el navegador. Sin descargar nada.",
  alternates: { canonical: "/pedir" },
  openGraph: {
    title: "DocYa — Pedí atención médica ahora",
    description: "Médico a domicilio o por video sin instalar ninguna app.",
    url: "/pedir",
  },
};

export default function PedirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
