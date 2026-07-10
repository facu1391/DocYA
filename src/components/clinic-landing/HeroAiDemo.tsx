// src/components/clinic-landing/HeroAiDemo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Mic, Sparkles } from "lucide-react";
import VoiceWaveform from "./shared/VoiceWaveform";
import { EASE_OUT, fadeUpItem, staggerContainer } from "./shared/variants";

const TRANSCRIPT = "Paciente con hipertensión controlada, buena adherencia al tratamiento.";
const WORDS = TRANSCRIPT.split(" ");

const STRUCTURED_NOTE = [
  { label: "Motivo de consulta", text: "Control de hipertensión arterial." },
  { label: "Evolución", text: "Buena adherencia al tratamiento. Sin síntomas asociados." },
  { label: "Plan", text: "Continuar esquema actual. Control en 30 días." },
];

const RESULT_CHIPS = ["Redacción mejorada", "Diagnóstico sugerido", "Medicación sugerida", "Estudios sugeridos"];

// Tiempo (ms) que cada fase permanece antes de avanzar a la siguiente.
const PHASE_DURATIONS = [1600, 2200, 1800, 3200];

function StaticResolvedDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--brand)" }}>
        <Sparkles className="h-4 w-4" />
        Evolución generada por IA
      </div>
      <div className="space-y-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--card)]/60 p-4">
        {STRUCTURED_NOTE.map((block) => (
          <div key={block.label}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">{block.label}</p>
            <p className="text-sm leading-relaxed text-foreground">{block.text}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {RESULT_CHIPS.map((chip) => (
          <div
            key={chip}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
              color: "var(--brand)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
            }}
          >
            <Check className="h-3.5 w-3.5" />
            {chip}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroAiDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px", amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timeout = setTimeout(() => {
      setPhase((p) => (p + 1) % PHASE_DURATIONS.length);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(timeout);
  }, [phase, inView, reduceMotion]);

  return (
    <div ref={ref} className="glass-card relative min-h-[440px] w-full max-w-md overflow-hidden p-6 sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand)]" />
        </span>
        Historia clínica con IA
      </div>

      <div className="relative mt-6 min-h-[300px]">
        {reduceMotion ? (
          <StaticResolvedDemo />
        ) : (
          <AnimatePresence mode="wait">
            {phase <= 1 ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
                    animate={phase === 0 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.1, repeat: phase === 0 ? Infinity : 0 }}
                  >
                    <Mic className="h-5 w-5" style={{ color: "var(--brand)" }} />
                  </motion.div>
                  <VoiceWaveform active={phase === 0} barCount={6} />
                </div>

                <p className="text-lg font-medium leading-relaxed text-foreground">
                  {phase >= 1 ? (
                    <motion.span variants={staggerContainer(0.09)} initial="hidden" animate="visible" className="inline">
                      {WORDS.map((word, i) => (
                        <motion.span key={i} variants={fadeUpItem} className="mr-1.5 inline-block">
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                  ) : (
                    <span className="text-text-muted">Escuchando la consulta…</span>
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="structured"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--brand)" }}>
                  <Sparkles className="h-4 w-4" />
                  Evolución generada por IA
                </div>

                <div className="space-y-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--card)]/60 p-4">
                  {STRUCTURED_NOTE.map((block, i) => (
                    <motion.div
                      key={block.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                        {block.label}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground">{block.text}</p>
                    </motion.div>
                  ))}
                </div>

                {phase === 3 && (
                  <motion.div
                    variants={staggerContainer(0.12, 0.1)}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-2 pt-1"
                  >
                    {RESULT_CHIPS.map((chip) => (
                      <motion.div
                        key={chip}
                        variants={fadeUpItem}
                        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                        style={{
                          borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
                          color: "var(--brand)",
                          background: "color-mix(in srgb, var(--brand) 8%, transparent)",
                        }}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {chip}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
