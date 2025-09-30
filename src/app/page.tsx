
// src/app/page.tsx
import HeroCreative from "@/components/landing/HeroCreative";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import Requirements from "@/components/landing/Requirements";

export default function Home() {
  return (
    <main>
      <HeroCreative />
      <Benefits />
      <HowItWorks />
      <Requirements />
    </main>
  );
}
