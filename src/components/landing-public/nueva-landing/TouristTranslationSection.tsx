"use client";

import Link from "next/link";
import { Globe2, Languages, ShieldCheck, Video } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

export default function TouristTranslationSection() {
  const { locale } = useI18n();
  const english = locale === "en";
  const copy = english
    ? {
        badge: "Medical care for tourists",
        title: "Real-time AI translation",
        highlight: "during your consultation",
        description: "Visiting Argentina and need a doctor? Eligible video consultations may include simultaneous English–Spanish AI translation, so you and the physician can communicate more clearly.",
        note: "Doctors are not necessarily bilingual. Translation is an optional technology feature shown during checkout when available.",
        primary: "Medical care in Buenos Aires",
        secondary: "Online doctor across Argentina",
        cards: ["English patient journey", "Real-time translated video", "Licensed Argentine physicians"],
      }
    : {
        badge: "Atención médica para turistas",
        title: "Traducción con IA",
        highlight: "en tiempo real",
        description: "Si estás de visita en Argentina, podés solicitar una teleconsulta y, cuando la opción esté disponible, sumar traducción simultánea inglés–español durante la videollamada.",
        note: "Los médicos no necesariamente son bilingües. La traducción es una función tecnológica opcional que se informa antes de confirmar el pago.",
        primary: "Atención para turistas en Buenos Aires",
        secondary: "Teleconsulta para turistas",
        cards: ["Solicitud disponible en inglés", "Videollamada traducida en tiempo real", "Médicos argentinos matriculados"],
      };

  const icons = [Globe2, Languages, ShieldCheck];

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-secondary/40 py-24 dark:bg-secondary/10">
      <div className="pointer-events-none absolute right-[-10%] top-[-40%] h-[480px] w-[480px] rounded-full bg-[var(--brand)]/10 blur-[110px]" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_.85fr]">
        <ScrollReveal>
          <div className="badge-trusted mb-4 w-fit"><Globe2 size={16} />{copy.badge}</div>
          <h2 className="section-title mb-5">{copy.title} <span className="highlight-text">{copy.highlight}</span></h2>
          <p className="max-w-2xl text-xl leading-relaxed text-text-muted">{copy.description}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">{copy.note}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/doctor-in-buenos-aires" className="btn-primary rounded-full px-6 py-3 font-bold">{copy.primary}</Link>
            <Link href="/medical-care-tourists-argentina" className="btn-outline-primary rounded-full px-6 py-3 font-bold">{copy.secondary}</Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-card rounded-3xl p-7 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--brand)]/15 text-[var(--brand)]"><Video size={27} /></div>
              <div><p className="font-bold">English ↔ Español</p><p className="text-sm text-text-muted">AI real-time translation</p></div>
            </div>
            <div className="space-y-3">
              {copy.cards.map((label, index) => {
                const Icon = icons[index];
                return <div key={label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 p-4"><Icon size={19} className="shrink-0 text-[var(--brand)]"/><span className="font-medium">{label}</span></div>;
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
