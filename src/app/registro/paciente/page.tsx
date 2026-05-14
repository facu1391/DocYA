import { Suspense } from "react";
import RegistroHero from "@/components/registro/RegistroHero";
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
    <div>
      <RegistroHero mode="paciente" />

      <section className="px-4 py-6 md:py-12">
        <div className="mx-auto w-full max-w-xl">
          <Suspense fallback={null}>
            <RegistroPacienteGoogleFlow />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
