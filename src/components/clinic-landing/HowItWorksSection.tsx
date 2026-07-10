// src/components/clinic-landing/HowItWorksSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, FileCheck2, FlaskConical, Mic, Pill } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import VoiceWaveform from "./shared/VoiceWaveform";
import { ANCHORS, fadeUpItem, staggerContainer } from "./shared/variants";

const STEPS = [
  {
    title: "Dictás la evolución",
    description: "El médico habla con naturalidad, sin dejar de mirar al paciente.",
    icon: Mic,
  },
  {
    title: "La IA escribe la evolución",
    description: "El dictado se transforma en texto clínico en tiempo real.",
    icon: Bot,
  },
  {
    title: "La IA mejora la redacción",
    description: "Ordena el relato, corrige y le da formato profesional.",
    icon: FileCheck2,
  },
  {
    title: "Sugiere el siguiente paso",
    description: "Propone medicación, estudios y certificados relacionados.",
    icon: FlaskConical,
  },
];

const STEP_INTERVAL = 3200;

const DIFF_PAIRS = [
  { before: "dolor de cabeza", after: "cefalea" },
  { before: "medio raro", after: "malestar general" },
];

function StepVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="flex items-center justify-center py-1">
        <VoiceWaveform active barCount={8} />
      </div>
    );
  }
  if (step === 1) {
    return (
      <motion.p
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="text-center text-sm font-medium leading-relaxed text-foreground"
      >
        {"Paciente refiere mejoría clínica evidente.".split(" ").map((w, i) => (
          <motion.span key={i} variants={fadeUpItem} className="mr-1 inline-block">
            {w}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  if (step === 2) {
    return (
      <div className="space-y-2 py-1 text-center text-sm font-medium">
        {DIFF_PAIRS.map((pair) => (
          <div key={pair.before} className="flex flex-col">
            <span className="text-text-muted line-through opacity-50">{pair.before}</span>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{ color: "var(--brand)" }}
            >
              {pair.after}
            </motion.span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      variants={staggerContainer(0.14)}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-2 py-1"
    >
      {[
        { icon: Pill, label: "Medicación" },
        { icon: FlaskConical, label: "Estudios" },
        { icon: FileCheck2, label: "Certificado" },
      ].map(({ icon: Icon, label }) => (
        <motion.span
          key={label}
          variants={fadeUpItem}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
            color: "var(--brand)",
            background: "color-mix(in srgb, var(--brand) 8%, transparent)",
          }}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), STEP_INTERVAL);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);

  const displayStep = reduceMotion ? 3 : active;

  return (
    <section id={ANCHORS.comoFunciona} ref={ref} className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Así funciona DocYa"
          title="De la consulta a la evolución clínica, en segundos"
          subtitle="Cuatro pasos, sin fricción, mientras el médico sigue mirando al paciente."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const isActive = i === displayStep;
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="glass-card flex flex-col items-center gap-4 p-6 text-center transition-colors duration-500"
                style={
                  isActive
                    ? { borderColor: "color-mix(in srgb, var(--brand) 40%, transparent)" }
                    : undefined
                }
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-500"
                  style={{
                    borderColor: isActive ? "var(--brand)" : "var(--border)",
                    color: isActive ? "var(--brand)" : "var(--text-muted)",
                    background: isActive ? "color-mix(in srgb, var(--brand) 10%, transparent)" : "transparent",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{step.description}</p>
                </div>
                <div className="flex min-h-[52px] w-full items-center justify-center">
                  {isActive ? <StepVisual step={i} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
