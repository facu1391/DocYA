import { Suspense } from "react";
import RegistroHero from "@/components/registro/RegistroHero";
import RegistroForm from "@/components/registro/RegistroForm";
import RegistroPacienteGoogleFlow from "@/components/registro/RegistroPacienteGoogleFlow";

export const metadata = {
  title: "Registro de pacientes",
  description: "Registrate gratis y accedé a atención médica y de enfermería a domicilio.",
  alternates: { canonical: "/registro/paciente" },
  openGraph: {
    title: "Registro de pacientes",
    description: "Conectá con profesionales verificados en minutos.",
    url: "/registro/paciente",
  },
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero mode="paciente" />

      <section className="container relative px-3 sm:px-4 md:px-6 py-10 md:py-14">
        <div className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div className="grid gap-8">
            <Suspense fallback={null}>
              <RegistroPacienteGoogleFlow />
            </Suspense>
            <Suspense fallback={null}>
              <RegistroForm mode="paciente" />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
