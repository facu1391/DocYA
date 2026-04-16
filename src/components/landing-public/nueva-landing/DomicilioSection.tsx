// src/components/landing-public/nueva-landing/DomicilioSection.tsx
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  "Red de médicos matriculados y verificados",
  "Tiempos de llegada optimizados y seguimiento GPS",
  "Sin salas de espera llenas de virus",
  "Emitimos recetas digitales instantáneas",
];

export default function DomicilioSection() {
  return (
    <section id="domicilio" className="py-32 bg-secondary/50 dark:bg-secondary/10 border-y border-border/50">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="relative glass-card overflow-hidden p-0 aspect-[4/3] shadow-2xl rounded-3xl group">
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774896739/Gemini_Generated_Image_6gvsot6gvsot6gvs_qkt3bh.png"
              alt="Consulta médica en domicilio"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={600}
              height={450}
            />
            {/* Trust overlay marker */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md rounded-2xl p-4 shadow-lg flex items-center gap-4 border border-border/50">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold m-0 leading-tight">Profesionales Certificados</p>
                <p className="text-xs text-text-muted m-0">100% Validado por DocYA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="badge-trusted mb-4 w-fit">
            <ShieldCheck size={16} />
            SERVICIO CONCIERGE MÉDICO
          </div>
          <h2 className="section-title mb-4">
            Atención médica de nivel <span className="highlight-text">en tu domicilio</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            Si se determina que requieres asistencia presencial, enviamos un médico certificado a tu hogar. Olvídate de los contagios en guardias y las largas esperas.
          </p>

          <ul className="flex flex-col gap-5">
            {features.map((label) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <CheckCircle2 size={24} className="text-[var(--brand)] shrink-0" />
                <span className="text-foreground/90">{label}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}