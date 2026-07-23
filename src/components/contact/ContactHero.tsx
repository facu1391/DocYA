// src/components/contact/ContactHero.tsx
import Link from "next/link";

interface Props {
  isClinic?: boolean;
}

export default function ContactHero({ isClinic = false }: Props) {
  return (
    <section className="relative border-b border-[var(--nav-border)] bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">{isClinic ? "DocYa Clinic" : "¿Necesitás ayuda?"}</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold md:text-5xl">
              {isClinic ? "Pedí tu demo de DocYa Clinic" : "Contacto"}
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              {isClinic ? (
                "Contanos sobre tu consultorio o clínica y te contactamos para coordinar la demo."
              ) : (
                <>
                  Escribinos y te respondemos. También podés consultar las{" "}
                  <Link href="/faqs" className="link-primary">
                    FAQs
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}