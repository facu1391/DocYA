// src/app/referidos/page.tsx
import type { Metadata } from "next";
import ReferidosLandingNavbar from "@/components/referidos/landing/ReferidosLandingNavbar";
import Hero from "@/components/referidos/landing/Hero";
import Explanation from "@/components/referidos/landing/Explanation";
import HowItWorks from "@/components/referidos/landing/HowItWorks";
import Benefits from "@/components/referidos/landing/Benefits";
import Zonas from "@/components/referidos/landing/Zonas";
import Earnings from "@/components/referidos/landing/Earnings";
import DashboardPreview from "@/components/referidos/landing/DashboardPreview";
import RegistrationForm from "@/components/referidos/landing/RegistrationForm";
import TermsAndConditions from "@/components/referidos/landing/TermsAndConditions";
import ReferidosLandingFooter from "@/components/referidos/landing/ReferidosLandingFooter";

export const metadata: Metadata = {
  title: "Partner DocYa",
  description:
    "Sumate al programa Partner DocYa y generá ingresos compartiendo una solución de salud real.",
  alternates: {
    canonical: "/referidos",
  },
  openGraph: {
    title: "Partner DocYa — Generá ingresos compartiendo salud",
    description:
      "Sumate al programa Partner DocYa y ganá por cada consulta válida.",
    url: "/referidos",
  },
};

export default function ReferidosPage() {
  return (
    <main className="relative overflow-x-hidden">
      <ReferidosLandingNavbar />
      <Hero />
      <Explanation />
      <HowItWorks />
      <Benefits />
      <Zonas />
      <Earnings />
      <DashboardPreview />
      <RegistrationForm />
      <TermsAndConditions />
      <ReferidosLandingFooter />
    </main>
  );
}