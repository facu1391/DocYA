// src/components/sections/FAQs.tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  { q: "¿Cuándo cobro?", a: "Acreditación semanal directamente en tu cuenta." },
  {
    q: "¿Puedo elegir horarios y zonas?",
    a: "Sí. Activás tu disponibilidad por franjas y por zona, y podés pausar cuando quieras.",
  },
  {
    q: "¿Qué pasa con urgencias?",
    a: "Las consultas con signos de urgencia se descartan y se recomienda comunicarse con el 911.",
  },
  {
    q: "¿Necesito monotributo?",
    a: "Sí, para facturación. Si todavía no lo tenés, podemos orientarte en el alta.",
  },
];

export default function FAQs() {
  return (
    <section className="relative overflow-hidden bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative z-10 py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">Soporte rápido</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
              Preguntas <span className="text-[var(--brand)]">frecuentes</span>
            </h1>

            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Respuestas rápidas sobre pagos, disponibilidad y requisitos para usar
              DocYa Pro como profesional.
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-4xl space-y-4 md:mt-12 md:space-y-5">
            <Accordion type="single" collapsible className="space-y-4 md:space-y-5">
              {faqs.map((f, i) => {
                const num = String(i + 1).padStart(2, "0");

                return (
                  <AccordionItem
                    key={f.q}
                    value={f.q}
                    className="
                      surface overflow-hidden rounded-3xl
                      border border-[color-mix(in_srgb,var(--brand)_8%,var(--border))]
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      transition-colors
                      data-[state=open]:border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                    "
                  >
                    <AccordionTrigger
                      className="
                        group flex w-full items-start gap-4 p-5 text-left md:p-6
                        [&>svg]:hidden
                      "
                    >
                      <span
                        className="
                          grid h-7 shrink-0 place-items-center rounded-full px-3
                          text-xs font-semibold tracking-wider md:h-8 md:text-sm
                          text-[var(--brand)]
                          bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                          ring-1 ring-[color-mix(in_srgb,var(--brand)_30%,transparent)]
                        "
                      >
                        {num}
                      </span>

                      <span className="pr-8 text-base font-medium md:text-lg">
                        {f.q}
                      </span>

                      <span className="ml-auto mt-0.5">
                        <Plus className="h-5 w-5 text-[var(--brand)] group-data-[state=open]:hidden" />
                        <Minus className="hidden h-5 w-5 text-[var(--brand)] group-data-[state=open]:block" />
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-0 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <div className="pt-4 text-center">
              <div className="surface rounded-2xl border p-5">
                <p className="text-sm text-muted-foreground md:text-base">
                  ¿No encontraste lo que buscabas?{" "}
                  <Link href="/contacto" className="link-primary">
                    Escribinos
                  </Link>{" "}
                  o revisá los{" "}
                  <Link href="/legal/terminos" className="link-primary">
                    Términos
                  </Link>{" "}
                  y la{" "}
                  <Link href="/legal/privacidad" className="link-primary">
                    Privacidad
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}