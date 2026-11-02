import { Suspense } from "react";
import Link from "next/link";
import RegistroHero from "@/components/registro/RegistroHero";
import RegistroPacienteEmailForm from "@/components/registro/RegistroPacienteEmailForm";

export const metadata = {
  title: "Crear cuenta con email | DocYa",
  description: "Registrate en DocYa con tu email y contraseña.",
  alternates: { canonical: "/registro/paciente/email" },
};

export default function RegistroPacienteEmailPage() {
  return (
    <main className="min-h-screen bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero
        mode="paciente"
        title="Creá tu cuenta en DocYa"
        subtitle="Registrate con tu email y contraseña, sin usar Google ni Apple."
      />
      <section className="px-4 py-6 md:py-10">
        <div className="mx-auto w-full max-w-2xl">
          <Suspense fallback={<div className="rounded-3xl border border-teal-500/20 bg-card p-8 text-center text-sm text-muted-foreground">Cargando formulario…</div>}>
            <RegistroPacienteEmailForm />
          </Suspense>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            <Link href="/pedir" className="underline underline-offset-4">Volver a iniciar sesión</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
