
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuándo cobro?", a: "Acreditación semanal directamente en tu cuenta." },
  { q: "¿Puedo elegir horarios y zonas?", a: "Sí, activás disponibilidad por franja y por zona." },
  { q: "¿Qué pasa con urgencias?", a: "Se descartan y se recomienda llamar al 911." },
  { q: "¿Necesito monotributo?", a: "Sí, para facturación. Podemos orientarte en el alta." },
];

export default function FAQs() {
  return (
    <section className="container py-16">
      <h1 className="text-2xl md:text-3xl font-semibold">Preguntas frecuentes</h1>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
