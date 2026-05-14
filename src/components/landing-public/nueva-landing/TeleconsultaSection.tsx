// src/components/landing-public/nueva-landing/TeleconsultaSection.tsx
import { CheckCircle2, Video } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  "Médicos verificados disponibles en minutos",
  "Sin salir de casa ni manejar",
  "Receta digital al instante",
  "Consultas disponibles las 24 hs",
];

export default function TeleconsultaSection() {
  return (
    <section
      id="teleconsulta"
      className="py-32 bg-secondary/50 dark:bg-secondary/10 border-y border-border/50"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        {/* Texto primero en mobile, segundo en desktop */}
        <ScrollReveal className="order-2 md:order-1">
          <div className="badge-trusted mb-4 w-fit">
            <Video size={16} />
            TELECONSULTA POR VIDEO
          </div>
          <h2 className="section-title mb-4">
            Tu médico en pantalla,{" "}
            <span className="highlight-text">donde estés</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            Consultá por videollamada con un profesional certificado desde tu celular o computadora. Ideal para consultas rápidas, seguimientos y cuando no podés recibir visita a domicilio.
          </p>

          <ul className="flex flex-col gap-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2
                  size={22}
                  className="shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Card visual */}
        <ScrollReveal delay={0.15} className="order-1 md:order-2">
          <div className="glass-card relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
            {/* Fondo degradado */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 30%, rgba(0,210,255,0.13) 0%, transparent 70%), radial-gradient(ellipse at 30% 80%, rgba(58,134,255,0.10) 0%, transparent 60%)",
              }}
            />

            {/* Ícono central */}
            <div
              className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-3xl shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,210,255,0.18) 0%, rgba(10,230,199,0.22) 100%)",
                border: "1px solid rgba(10,230,199,0.25)",
              }}
            >
              <Video size={44} style={{ color: "var(--primary)" }} />
            </div>

            <p
              className="relative z-10 text-center text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              Videollamada
            </p>
            <p className="relative z-10 mt-2 text-center text-text-muted">
              Consulta médica online segura
            </p>

            {/* Badge inferior */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-border/50 bg-background/90 p-4 shadow-lg backdrop-blur-md">
              <div
                className="rounded-full p-2"
                style={{
                  background: "rgba(10,230,199,0.12)",
                  color: "var(--primary)",
                }}
              >
                <Video size={20} />
              </div>
              <div>
                <p className="m-0 text-sm font-bold leading-tight">
                  Disponible 24/7
                </p>
                <p className="m-0 text-xs text-text-muted">
                  Médicos en minutos
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
