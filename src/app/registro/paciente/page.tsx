import { Suspense } from "react";
import Link from "next/link";
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

      <section className="overflow-x-hidden px-4 py-6 md:py-12">
        <div className="mx-auto w-full max-w-xl overflow-hidden">
          <Suspense fallback={null}>
            <RegistroPacienteGoogleFlow />
          </Suspense>
          <div className="mt-5 rounded-2xl border border-teal-500/20 bg-card px-5 py-4 text-center">
            <p className="text-sm text-muted-foreground">¿No usás Google o Apple?</p>
            <Link href="/registro/paciente/email" className="mt-1 inline-flex font-semibold text-teal-600 hover:underline">
              Registrate con email y contraseña
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
