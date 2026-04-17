// src/components/landing-public/nueva-landing/ResolucionSection.tsx
import { FileCheck2, HeartPulse, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ResolucionSection() {
  return (
    <section className="dark-section py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ScrollReveal>
            <div className="glass-card flex h-full flex-col">
              <div
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "rgba(10, 230, 199, 0.1)", color: "var(--primary)" }}
              >
                <FileCheck2 size={32} />
              </div>

              <h3 className="mb-4 text-2xl font-bold">Resolvé todo en una sola consulta</h3>

              <ul className="mb-6 flex flex-col gap-4">
                {["Diagnóstico", "Receta médica", "Certificado laboral", "Tratamiento en el momento"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg font-medium">
                    <Check size={20} style={{ color: "var(--accent)" }} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="glass-card flex h-full flex-col">
              <div
                className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "rgba(10, 230, 199, 0.1)", color: "var(--primary)" }}
              >
                <HeartPulse size={32} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">También enfermería a domicilio</h3>

              <p className="text-text-muted mb-6 text-lg">
                Servicios profesionales en la comodidad de tu hogar.
              </p>

              <ul className="flex flex-col gap-4">
                {["Inyectables", "Curaciones", "Controles"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg font-medium">
                    <Check size={20} style={{ color: "var(--accent)" }} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
