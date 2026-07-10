// src/components/clinic-landing/ClinicFinalCTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import { CTA_DEMO_HREF } from "./shared/variants";

export default function ClinicFinalCTA() {
  return (
    <section className="py-28" style={{ background: "linear-gradient(135deg, #0a272c, #07141d)" }}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="section-title text-white">Empezá a atender diferente, hoy.</h2>
          <p className="mt-5 text-lg text-white/70">
            Sumate a los consultorios que ya dejaron de perder tiempo en tareas administrativas.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={CTA_DEMO_HREF} className="btn-primary h-12 px-6 text-base">
              Solicitar Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-lg border px-6 text-base font-medium text-white transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Conocer DocYa
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
