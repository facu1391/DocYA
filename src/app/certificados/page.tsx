import type { Metadata } from "next";
import TeleconsultaAds from "../teleconsulta-ads/TeleconsultaAds";

export const metadata: Metadata = {
  title: "Certificado médico digital con evaluación | DocYa",
  description: "Solicitá una teleconsulta sin turno con un médico matriculado. Si corresponde, el profesional puede emitir un certificado médico digital con QR.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function CertificadosPage() {
  return <TeleconsultaAds certificados />;
}
