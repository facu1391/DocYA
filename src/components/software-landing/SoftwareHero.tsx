// src/components/software-landing/SoftwareHero.tsx
import {
  CheckCircle2,
  Boxes,
  Headset,
  BookOpenText,
  Plug,
  BrainCircuit,
  BarChart3,
  MessageCircle,
  Building2,
} from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";

const trustIndicators = [
  "Desarrollo personalizado",
  "Modalidad white-label",
  "Soporte y mantenimiento",
  "Atención internacional",
];

const ecosystemNodes = [
  { icon: Boxes, label: "Jira", position: "left-0 top-4" },
  { icon: Headset, label: "Jira Service Management", position: "right-0 top-0" },
  { icon: BookOpenText, label: "Confluence", position: "left-2 top-40" },
  { icon: Plug, label: "APIs externas", position: "right-2 top-40" },
  { icon: BrainCircuit, label: "Inteligencia artificial", position: "left-10 top-[19rem]" },
  { icon: BarChart3, label: "Dashboards", position: "right-10 top-[19rem]" },
  { icon: MessageCircle, label: "WhatsApp", position: "left-0 top-[27rem]" },
  { icon: Building2, label: "ERP y CRM", position: "right-0 top-[27rem]" },
];

export default function SoftwareHero() {
  return (
    <section
      id="software-inicio"
      className="relative overflow-hidden bg-[var(--sw-bg)] pb-24 pt-40 sm:pb-32 sm:pt-48"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[var(--sw-teal-10)] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[var(--sw-blue-10)] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <ScrollReveal>
          <span className="inline-block rounded-full border border-[var(--sw-border)] bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--sw-teal)]">
            Custom Development for the Atlassian Ecosystem
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--sw-text)] sm:text-5xl lg:text-[3.25rem]">
            Creamos las soluciones que tu entorno Atlassian necesita
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--sw-subtle)]">
            Desarrollamos aplicaciones, integraciones, automatizaciones y dashboards
            personalizados para Jira, Jira Service Management y Confluence.
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--sw-subtle)]">
            Trabajamos directamente con empresas y como equipo de desarrollo
            white-label para Atlassian Solution Partners.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#software-contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--sw-teal-30)] transition-all duration-300 hover:brightness-110"
            >
              Solicitar una reunión
            </a>
            <a
              href="#software-servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--sw-border-strong)] bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--sw-text)] transition-all duration-300 hover:bg-white/10"
            >
              Ver nuestros servicios
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {trustIndicators.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[var(--sw-subtle)]">
                <CheckCircle2 size={16} className="shrink-0 text-[var(--sw-teal)]" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="relative mx-auto hidden h-[32rem] max-w-md lg:block"
            role="img"
            aria-label="Representación del ecosistema de integraciones de Docya Software conectando Jira, Jira Service Management, Confluence, APIs externas, inteligencia artificial, dashboards, WhatsApp, ERP y CRM"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 512" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="sw-line-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#137CBD" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00B8D9" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {[
                "M60,40 L200,256",
                "M340,20 L200,256",
                "M50,180 L200,256",
                "M350,180 L200,256",
                "M90,300 L200,256",
                "M310,300 L200,256",
                "M60,370 L200,256",
                "M340,370 L200,256",
              ].map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="url(#sw-line-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="animate-[sw-dash_2.5s_linear_infinite]"
                />
              ))}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[var(--sw-teal-30)] bg-[var(--sw-bg2)] shadow-[0_0_60px_-10px_rgba(0,184,217,0.5)]">
              <span className="text-center text-xs font-semibold leading-tight text-[var(--sw-text)]">
                Docya
                <br />
                Platform
              </span>
            </div>

            {ecosystemNodes.map(({ icon: Icon, label, position }) => (
              <div
                key={label}
                className={`absolute ${position} flex w-32 items-center gap-2 rounded-xl border border-[var(--sw-border)] bg-[var(--sw-bg2)]/90 p-3 shadow-lg backdrop-blur-sm [animation:sw-float_6s_ease-in-out_infinite]`}
                style={{ animationDelay: `${label.length * 120}ms` }}
              >
                <Icon size={16} className="shrink-0 text-[var(--sw-teal)]" />
                <span className="text-xs font-medium leading-tight text-[var(--sw-subtle)]">{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes sw-dash { to { stroke-dashoffset: 0; } }
        @keyframes sw-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </section>
  );
}
