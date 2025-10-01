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

const faqs: FAQ[] = [
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
    <section className="relative overflow-hidden">
      {/* fondo suave y glow de marca */}
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="container relative z-10 py-16 md:py-20">
        {/* Título centrado */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Preguntas <span className="text-[var(--brand)]">frecuentes</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Respuestas rápidas sobre pagos, disponibilidad y requisitos para usar
            DocYa Pro como profesional.
          </p>
        </header>

        {/* Lista */}
        <div className="mt-10 md:mt-12 max-w-4xl mx-auto space-y-4 md:space-y-5">
          <Accordion type="single" collapsible className="space-y-4 md:space-y-5">
            {faqs.map((f, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <AccordionItem
                  key={f.q}
                  value={f.q}
                  className="
                    surface rounded-2xl overflow-hidden
                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                    border border-[color-mix(in_srgb,var(--brand) 6%,var(--border))]
                    data-[state=open]:border-[var(--brand)]
                    transition-colors
                  "
                >
                  <AccordionTrigger
                    className="
                      group flex w-full items-start gap-4 p-5 md:p-6 text-left
                      [&>svg]:hidden  /* oculta el chevron por defecto del Trigger */
                    "
                  >
                    {/* Número a la izquierda */}
                    <span
                      className="
                        shrink-0 rounded-full px-3 h-7 md:h-8 grid place-items-center
                        text-xs md:text-sm font-semibold tracking-wider
                        text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand) 10%,transparent)]
                        ring-1 ring-[color-mix(in_srgb,var(--brand) 30%,transparent)]
                      "
                    >
                      {num}
                    </span>

                    {/* Pregunta */}
                    <span className="text-base md:text-lg font-medium pr-8">
                      {f.q}
                    </span>

                    {/* Iconos + / − a la derecha */}
                    <span className="ml-auto mt-0.5">
                      <Plus className="h-5 w-5 text-[var(--brand)] group-data-[state=open]:hidden" />
                      <Minus className="h-5 w-5 text-[var(--brand)] hidden group-data-[state=open]:block" />
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pt-0 pb-6 text-sm md:text-base text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* CTA inferior */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
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
    </section>
  );
}
