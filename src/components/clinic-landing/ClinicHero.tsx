// src/components/clinic-landing/ClinicHero.tsx
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import HeroAiDemo from "./HeroAiDemo";
import { ANCHORS, CTA_DEMO_HREF } from "./shared/variants";

const SUBTITLE_ITEMS = [
  "Historia Clínica con IA",
  "WhatsApp inteligente",
  "Teleconsultas",
  "Recetas digitales",
  "Certificados",
  "Contabilidad",
];

export default function ClinicHero() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48"
      style={{ background: "linear-gradient(180deg, #0a272c 0%, #071d21 65%, #071d21 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,179,166,0.16), transparent 40%), radial-gradient(circle at 85% 0%, rgba(58,134,255,0.12), transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10">
        <ScrollReveal>
          <span className="badge-trusted">Software médico con IA</span>

          <h1 className="hero-title mt-6 text-white">
            La plataforma inteligente para consultorios y clínicas.
          </h1>

          <div className="mt-6 flex flex-wrap gap-2">
            {SUBTITLE_ITEMS.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg font-semibold text-white">Todo en un solo lugar.</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={CTA_DEMO_HREF} className="btn-primary h-12 px-6 text-base">
              Solicitar Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`#${ANCHORS.comoFunciona}`}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-6 text-base font-medium text-white/90 transition hover:text-white"
            >
              <PlayCircle className="h-5 w-5" />
              Ver cómo funciona
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center lg:justify-end">
          <HeroAiDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}
