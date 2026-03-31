// src/components/landing-public/nueva-landing/DomicilioSection.tsx
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  "Sin guardias",
  "Sin traslados",
  "Atención médica real",
  "Resolución en el momento",
];

export default function DomicilioSection() {
  return (
    <section id="domicilio" className="py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="glass-card overflow-hidden p-0" style={{ aspectRatio: "4/3" }}>
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774896739/Gemini_Generated_Image_6gvsot6gvsot6gvs_qkt3bh.png"
              alt="Consulta médica en domicilio"
              width={600}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="section-title mb-4">
            Si lo necesitás, el médico{" "}
            <span className="highlight-text">va a tu casa</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            Después de la evaluación con IA, podés solicitar atención médica a domicilio y
            recibir una consulta profesional sin moverte de tu casa.
          </p>

          <ul className="flex flex-col gap-5">
            {features.map((label) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <CheckCircle2 size={24} style={{ color: "var(--accent)" }} className="shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}