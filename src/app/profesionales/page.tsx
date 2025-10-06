import HeroCreative from "@/components/landing/HeroCreative";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import Requirements from "@/components/landing/Requirements";
import Steps from "@/components/landing/Steps";
import Trust from "@/components/landing/Trust";
import DemandInsights from "@/components/landing/DemandInsights";
import DownloadAppPublic from "@/components/landing-public/DownloadAppPublic";


export const metadata = {
  title: "Profesionales | DocYa Pro",
  description:
    "Sumate como médico o enfermero. Elegí horarios y zonas. Ingresos semanales.",
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
         <DownloadAppPublic />
    </main>
  );
}