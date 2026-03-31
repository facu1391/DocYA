// src/components/landing-public/nueva-landing/IASection.tsx
import Image from "next/image";
import { CheckCircle2, Clock, AlertTriangle, Map } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: CheckCircle2, label: "Gratis e inmediato" },
  { icon: Clock, label: "Disponible 24/7" },
  { icon: AlertTriangle, label: "Detecta signos de alarma" },
  { icon: Map, label: "Te guía paso a paso" },
];

export default function IASection() {
  return (
    <section id="ia" className="py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div
            className="glass-card mx-auto overflow-hidden p-0"
            style={{ aspectRatio: "9/16", maxWidth: 340 }}
          >
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774895672/Quer%C3%A9s_que_un_m%C3%A9dico_vaya_a_tu_domicilio_ahora_%EF%B8%8F_Atenci%C3%B3n_en_tu_casa_%EF%B8%8F_Sin_guardias_ni_esperas_%EF%B8%8F_Evaluaci%C3%B3n_m%C3%A9dica_completa_swptiq.png"
              alt="Atención médica a domicilio"
              width={340}
              height={604}
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="section-title mb-4">
            Consultá GRATIS con{" "}
            <span className="highlight-text">IA médica</span>
          </h2>

          <p className="text-text-muted mb-8 max-w-lg text-xl leading-relaxed">
            Nuestra inteligencia artificial analiza tus síntomas, te hace preguntas y te
            orienta en segundos, sin costo.
          </p>

          <ul className="mb-8 flex flex-col gap-5">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <Icon size={24} style={{ color: "var(--accent)" }} className="shrink-0" />
                {label}
              </li>
            ))}
          </ul>

          <div
            className="rounded-r-2xl px-6 py-5 text-lg"
            style={{
              background: "rgba(0, 210, 255, 0.08)",
              borderLeft: "4px solid #0AE6C7",
            }}
          >
            <strong>Sin pagar. Sin vueltas. En segundos.</strong>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}