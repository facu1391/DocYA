import type { Metadata } from "next";
import TeleconsultaAds from "./TeleconsultaAds";

export const metadata: Metadata = {
  title: "Teleconsulta médica | DocYa",
  description: "Consultá con un médico por videollamada desde Argentina.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function TeleconsultaAdsPage() {
  return <TeleconsultaAds />;
}
