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
    <main className="min-h-screen overflow-x-hidden bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero mode="pro" className="registro-pro-hero" />

      <section className="relative px-3 py-6 sm:px-4 md:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto w-full max-w-xl overflow-hidden md:max-w-2xl lg:max-w-3xl">
            <Suspense fallback={null}>
              <RegistroProGoogleFlow />
            </Suspense>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .registro-pro-hero > div.relative {
            padding-top: 1.75rem;
            padding-bottom: 1.75rem;
          }
        }
      `}</style>
    </main>
  );
}
