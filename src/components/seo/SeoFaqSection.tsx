// src/components/seo/SeoFaqSection.tsx
"use client";

import Script from "next/script";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { buildFaqJsonLd, type FaqItem } from "@/lib/seo/schema";

interface SeoFaqSectionProps {
  items: FaqItem[];
  jsonLdId: string;
  title?: string;
  subtitle?: string;
}

export default function SeoFaqSection({
  items,
  jsonLdId,
  title = "Preguntas frecuentes",
  subtitle,
}: SeoFaqSectionProps) {
  const jsonLd = buildFaqJsonLd(items);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-4xl px-6">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-3">{title}</h2>
        {subtitle && (
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">{subtitle}</p>
        )}

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="surface overflow-hidden rounded-2xl border px-2 data-[state=open]:border-[color-mix(in_srgb,var(--brand)_45%,transparent)]"
              >
                <AccordionTrigger className="group flex w-full items-start gap-4 p-5 text-left [&>svg]:hidden">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--brand)_30%,transparent)]">
                    {num}
                  </span>
                  <span className="pr-8 text-base font-medium md:text-lg">{item.question}</span>
                  <span className="ml-auto mt-0.5">
                    <Plus className="h-5 w-5 text-[var(--brand)] group-data-[state=open]:hidden" />
                    <Minus className="hidden h-5 w-5 text-[var(--brand)] group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-sm leading-relaxed text-text-muted md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <Script
        id={jsonLdId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
