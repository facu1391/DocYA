// src/components/landing-public/nueva-landing/IASection.tsx
import Image from "next/image";
import { CheckCircle2, Clock, AlertTriangle, Map } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: CheckCircle2, label: "Triage Inteligente Inicial" },
  { icon: AlertTriangle, label: "Detección de Signos de Alarma" },
  { icon: Clock, label: "Asistencia Continua 24/7" },
  { icon: Map, label: "Derivación Segura a Domicilio" },
];

export default function IASection() {
  return (
    <section id="ia" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand)]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
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
          <div className="badge-trusted mb-4 w-fit">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-[var(--brand)]"></span>
            Asistente Médico Virtual
          </div>

          <h2 className="section-title mb-4">
            Evaluación preliminar con{" "}
            <span className="highlight-text">IA Médica</span>
          </h2>

          <p className="text-text-muted mb-8 max-w-lg text-xl leading-relaxed">
            Nuestro sistema de validación inteligente analiza tus síntomas
            mediante protocolos clínicos comprobados, orientándote de manera
            segura y sin costo alguno.
          </p>

          <div className="mb-10 flex flex-col gap-6">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{label}</h4>
                  <p className="text-sm text-text-muted">
                    Paso validado por profesionales de la salud.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-r-2xl border-l-4 border-[var(--brand)] bg-[var(--brand)]/10 px-6 py-5">
            <strong className="mb-1 block text-lg text-[var(--brand)]">
              Pre-diagnóstico confidencial
            </strong>
            <span className="text-sm font-medium text-foreground">
              100% gratuito. Sin compromisos. En segundos.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}