// src/components/clinic-landing/partner/PartnerHero.tsx
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedCounter from "../shared/AnimatedCounter";
import { CTA_PARTNER_HREF } from "../shared/variants";
import { PARTNER_ANCHORS } from "./anchors";

const SUBTITLE_ITEMS = [
  "Panel propio",
  "Altas de médicos en minutos",
  "Comisión recurrente",
  "Sin inversión",
];

const PREVIEW_ROWS = [
  { name: "Dr. Ramírez", status: "En prueba", detail: "vence en 3 días", tone: "amber" as const },
  { name: "Dra. Gómez", status: "Activo", detail: "paga desde marzo", tone: "brand" as const },
  { name: "Dr. Beltrán", status: "Pago pendiente", detail: "esperando confirmación", tone: "red" as const },
];

const TONE_STYLES: Record<"amber" | "brand" | "red", { dot: string; text: string; bg: string }> = {
  amber: { dot: "#f59e0b", text: "#fbbf24", bg: "rgba(245,158,11,0.12)" },
  brand: { dot: "var(--brand)", text: "#4df0e1", bg: "color-mix(in srgb, var(--brand) 16%, transparent)" },
  red: { dot: "#f87171", text: "#fca5a5", bg: "rgba(248,113,113,0.12)" },
};

function PartnerHeroVisual() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-white/50">Tu panel de Partner</span>
        <span className="flex h-2 w-2 rounded-full" style={{ background: "var(--brand)" }} />
      </div>

      <p className="mt-5 text-xs font-medium text-white/50">Comisión estimada este mes</p>
      <p className="text-4xl font-bold text-white">
        <AnimatedCounter to={84000} duration={1.4} prefix="$" />
      </p>
      <p className="mt-1 text-xs text-white/40">3 consultorios activos generando comisión</p>

      <div className="mt-6 space-y-2.5">
        {PREVIEW_ROWS.map((row) => {
          const tone = TONE_STYLES[row.tone];
          return (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold text-white">{row.name}</p>
                <p className="text-xs text-white/45">{row.detail}</p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: tone.bg, color: tone.text }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.dot }} />
                {row.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PartnerHero() {
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
          <span className="badge-trusted">Partners DocYa Clinic</span>

          <h1 className="hero-title mt-6 text-white">
            Sumá médicos a DocYa Clinic y ganá una comisión todos los meses.
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
          <p className="mt-4 text-lg font-semibold text-white">
            Vos sumás al médico, DocYa hace el resto.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={CTA_PARTNER_HREF} className="btn-primary h-12 px-6 text-base">
              Quiero ser Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`#${PARTNER_ANCHORS.comoFunciona}`}
              className="inline-flex h-12 items-center gap-2 rounded-lg px-6 text-base font-medium text-white/90 transition hover:text-white"
            >
              <PlayCircle className="h-5 w-5" />
              Ver cómo funciona
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex justify-center lg:justify-end">
          <PartnerHeroVisual />
        </ScrollReveal>
      </div>
    </section>
  );
}
