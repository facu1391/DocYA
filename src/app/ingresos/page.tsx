// src/app/ingresos/page.tsx
import EarningsCalculator from "@/components/sections/EarningsCalculator";
import EarningsExplainer from "@/components/sections/EarningsExplainer";
import EarningsExamples from "@/components/sections/EarningsExamples";

export const metadata = {
  title: "Calculadora de ingresos",
  description: "Estimá tus ingresos semanales y mensuales como profesional en DocYa.",
  alternates: { canonical: "/ingresos" },
  openGraph: {
    title: "Calculadora de ingresos",
    description: "Proyectá ingresos semanales y mensuales.",
    url: "/ingresos",
  },
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <EarningsCalculator />
      <EarningsExplainer />
      <EarningsExamples />
    </main>
  );
}