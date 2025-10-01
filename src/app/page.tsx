
// src/app/page.tsx
import HeroCreative from "@/components/landing/HeroCreative";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import Requirements from "@/components/landing/Requirements";
import Steps from "@/components/landing/Steps";
import Trust from "@/components/landing/Trust";
import DemandInsights from "@/components/landing/DemandInsights";


export default function Home() {
  return (
    <main>
      <HeroCreative />
      <HowItWorks />
      <Benefits />
      <Steps />
      <Trust />
      <Requirements />
      <DemandInsights />
    </main>
  );
}
