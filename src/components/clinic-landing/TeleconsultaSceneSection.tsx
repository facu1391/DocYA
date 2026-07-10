// src/components/clinic-landing/TeleconsultaSceneSection.tsx
"use client";

import { motion } from "framer-motion";
import { Stethoscope, User, Video } from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";
import { ANCHORS } from "./shared/variants";

const FLOATING_CARDS = [
  { label: "Estudios disponibles", cls: "-top-2 left-2" },
  { label: "Recetas", cls: "top-1/2 -right-4 -translate-y-1/2" },
  { label: "Historia clínica", cls: "-bottom-2 left-1/3" },
];

function PersonCard({ icon: Icon, name, role }: { icon: typeof User; name: string; role: string }) {
  return (
    <div className="glass-card flex w-44 shrink-0 flex-col items-center gap-3 p-5 text-center sm:w-52">
      <div className="relative">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
        >
          <Icon className="h-7 w-7" style={{ color: "var(--brand)" }} />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--card)] bg-emerald-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </span>
      </div>
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-xs text-text-muted">{role}</p>
      </div>
    </div>
  );
}

export default function TeleconsultaSceneSection() {
  return (
    <section
      id={ANCHORS.teleconsulta}
      className="scroll-mt-24 py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--background), color-mix(in srgb, var(--brand) 5%, var(--background)))",
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Teleconsulta"
          title="Consultas a distancia, con todo sincronizado"
          subtitle="Estudios, recetas e historia clínica disponibles en tiempo real, para el médico y para el paciente."
        />

        <ScrollReveal className="mt-16">
          <div className="relative mx-auto max-w-3xl px-4 py-8">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <PersonCard icon={User} name="Paciente" role="Desde su casa" />

              <div
                className="relative hidden h-0.5 flex-1 sm:mx-4 sm:block"
                style={{ background: "color-mix(in srgb, var(--brand) 25%, transparent)" }}
              >
                <motion.div
                  className="absolute -top-1.5 h-4 w-4 rounded-full"
                  style={{ background: "var(--brand)", boxShadow: "0 0 12px var(--brand)" }}
                  animate={{ left: ["0%", "94%", "0%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 -top-3 flex items-center justify-center">
                  <Video className="h-5 w-5" style={{ color: "var(--brand)" }} />
                </div>
              </div>
              <div
                className="h-10 w-0.5 sm:hidden"
                style={{ background: "color-mix(in srgb, var(--brand) 25%, transparent)" }}
                aria-hidden="true"
              />

              <PersonCard icon={Stethoscope} name="Médico" role="Desde el consultorio" />
            </div>

            <div className="relative mt-8 hidden md:block">
              {FLOATING_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`floating-card ${card.cls}`}
                >
                  {card.label}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
              {FLOATING_CARDS.map((card) => (
                <span
                  key={card.label}
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium backdrop-blur-xl"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
                >
                  {card.label}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
