// src/app/registro/page.tsx
import { Suspense } from "react";
import RegistroHero from "@/components/registro/RegistroHero";
import RegistroProGoogleFlow from "@/components/registro/RegistroProGoogleFlow";

export const metadata = {
  title: "Registro de profesionales",
  description: "Postulate como médico/a o enfermero/a y empezá a recibir consultas a domicilio.",
  alternates: { canonical: "/registro" },
  openGraph: {
    title: "Registro de profesionales",
    description: "Médicos/as y enfermeros/as: empezá a atender con DocYa.",
    url: "/registro",
  },
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero mode="pro" />

      <section className="relative py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            <Suspense fallback={null}>
              <RegistroProGoogleFlow />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
