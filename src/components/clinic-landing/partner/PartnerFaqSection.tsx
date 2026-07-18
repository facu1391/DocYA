// src/components/clinic-landing/partner/PartnerFaqSection.tsx
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";
import { PARTNER_ANCHORS } from "./anchors";

const FAQS = [
  {
    q: "¿Tengo que pagar algo para ser Partner?",
    a: "No. Sumarte al programa no tiene costo. Vos das de alta pruebas gratuitas para los médicos, DocYa se encarga del resto.",
  },
  {
    q: "¿Cuánto dura la prueba gratuita del médico?",
    a: "5 días, sin necesidad de tarjeta de crédito ni compromiso de pago.",
  },
  {
    q: "¿Qué pasa si el médico no se convierte en cliente pago?",
    a: "No generás comisión por esa cuenta puntual, pero podés seguir sumando médicos nuevos sin límite.",
  },
  {
    q: "¿Cómo y cuándo cobro mi comisión?",
    a: "Se genera automáticamente cuando DocYa confirma el pago del consultorio, todos los meses que se mantenga activo.",
  },
  {
    q: "¿Necesito experiencia en ventas o en tecnología?",
    a: "No. Vos identificás al médico interesado y cargás sus datos; DocYa se encarga de la demo, el soporte y el cobro.",
  },
  {
    q: "¿Puedo sumar médicos de cualquier especialidad?",
    a: "Sí. DocYa Clinic sirve para consultorios y clínicas de cualquier especialidad médica.",
  },
];

export default function PartnerFaqSection() {
  return (
    <section id={PARTNER_ANCHORS.preguntas} className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que preguntan antes de sumarse" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={(i % 2) * 0.08} y={16}>
              <div className="glass-card h-full p-6">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{faq.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
