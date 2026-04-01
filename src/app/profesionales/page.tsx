// src/app/profesionales/page.tsx
import HeroCreative from "@/components/landing/HeroCreative";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import Requirements from "@/components/landing/Requirements";
import Steps from "@/components/landing/Steps";
import Trust from "@/components/landing/Trust";
import DemandInsights from "@/components/landing/DemandInsights";
import FinalCTA from "@/components/landing-public/nueva-landing/FinalCTA";



export const metadata = {
  title: "Profesionales",
  description: "Sumate como médico o enfermero. Elegí horarios y zonas. Ingresos semanales.",
  alternates: { canonical: "/profesionales" },
  openGraph: {
    title: "Profesionales",
    description: "Elegí horarios y zonas. Ingresos semanales.",
    url: "/profesionales",
  },
};

export default function Page() {
  return (
    <main>
        <HeroCreative />
        <HowItWorks />
        <Benefits />
        <Steps />
        <Trust />
        <Requirements />
        <DemandInsights />
        <FinalCTA mode="pro" />
      
    </main>
  );
}