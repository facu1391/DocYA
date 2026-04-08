// src/app/registro/paciente/page.tsx
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

function RegistroPacienteGoogleFlowFallback() {
  return (
    <div className="surface rounded-3xl border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6 md:p-8">
      <div className="mb-6">
        <span className="badge">Pacientes</span>
        <h2 className="mt-3 text-xl font-semibold md:text-2xl">
          Registrate con Google
        </h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Estamos preparando el flujo de registro…
        </p>
      </div>

      <div className="grid gap-5">
        <div className="rounded-2xl border bg-background/70 p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-muted" />
          <div className="mt-4 h-3 w-4/5 animate-pulse rounded bg-muted" />
        </div>

        <div className="rounded-2xl border bg-background/60 p-5">
          <div className="h-4 w-52 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero mode="paciente" />

      <section className="container relative px-3 py-10 sm:px-4 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div className="grid gap-8">
            <Suspense fallback={<RegistroPacienteGoogleFlowFallback />}>
              <RegistroPacienteGoogleFlow />
            </Suspense>

            <RegistroForm mode="paciente" />
          </div>
        </div>
      </section>
    </main>
  );
}