import type { Metadata } from "next";
import TeleconsultaAds from "./TeleconsultaAds";

export const metadata: Metadata = {
  title: "Teleconsulta médica sin turno | DocYa",
  description: "Pedí una teleconsulta sin turno. DocYa busca un médico disponible y te conecta por videollamada desde tu celular.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function TeleconsultaAdsPage() {
  return <TeleconsultaAds />;
}
