import HeroPro from "@/components/landing/HeroPro";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import EarningsCalculator from "@/components/landing/EarningsCalculator";
import Requirements from "@/components/landing/Requirements";
import FAQs from "@/components/landing/FAQs";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <HeroPro />
      <Benefits />
      <HowItWorks />
      <EarningsCalculator />
      <Requirements />
      <FAQs />

      <section className="container py-20">
        <div className="rounded-2xl border p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">¿Listo para unirte?</h2>
          <p className="text-muted-foreground mt-2">Registro rápido, 100% online.</p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/registro">Comenzar registro</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
