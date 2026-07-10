// src/components/clinic-landing/WhatsAppAISection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Check } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import ScrollReveal from "./shared/ScrollReveal";
import { ANCHORS, fadeUpItem, staggerContainer } from "./shared/variants";

const MESSAGES: { from: "patient" | "ai"; text: string }[] = [
  { from: "patient", text: "Hola, quiero un turno con el cardiólogo." },
  { from: "ai", text: "Tengo disponible mañana 15:30. ¿Te lo reservo?" },
  { from: "patient", text: "Perfecto, dale." },
];

const RESULT_CARDS = ["Turno confirmado", "Recordatorio automático", "Confirmación automática"];

const BENEFITS = [
  "Responde consultas y agenda turnos las 24 horas.",
  "Confirma y recuerda automáticamente antes de la consulta.",
  "El médico solo ve la agenda ya organizada.",
];

export default function WhatsAppAISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingAi, setTypingAi] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setVisibleCount(MESSAGES.length);
      setShowResults(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 400;
    MESSAGES.forEach((msg, i) => {
      if (msg.from === "ai") {
        timers.push(setTimeout(() => setTypingAi(true), elapsed));
        elapsed += 900;
        timers.push(setTimeout(() => setTypingAi(false), elapsed));
      }
      const at = elapsed;
      timers.push(setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), at));
      elapsed += 700;
    });
    timers.push(setTimeout(() => setShowResults(true), elapsed + 300));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  return (
    <section id={ANCHORS.whatsapp} className="scroll-mt-24 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <ScrollReveal>
          <SectionHeading eyebrow="WhatsApp IA" title="Los turnos se agendan solos" align="left" />
          <ul className="mt-8 space-y-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "color-mix(in srgb, var(--brand) 15%, transparent)" }}
                >
                  <Check className="h-3 w-3" style={{ color: "var(--brand)" }} />
                </span>
                <span className="text-text-muted">{b}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card mx-auto flex max-w-sm flex-col overflow-hidden p-0">
            <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-5 py-4">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: "var(--brand)" }}
              >
                <Bot className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">DocYa Clinic</p>
                <p className="flex items-center gap-1 text-xs text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> en línea
                </p>
              </div>
            </div>

            <div className="flex h-[260px] flex-col justify-end gap-2.5 overflow-hidden px-5 py-4">
              {MESSAGES.slice(0, visibleCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === "ai" ? "self-start text-white" : "self-end bg-[var(--muted)] text-foreground"
                  }`}
                  style={msg.from === "ai" ? { background: "var(--brand)" } : undefined}
                >
                  {msg.text}
                </motion.div>
              ))}
              {typingAi && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-fit items-center gap-1 self-start rounded-2xl px-4 py-3"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--brand)" }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {showResults && (
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                animate="visible"
                className="space-y-2 border-t border-[var(--glass-border)] px-5 py-4"
              >
                {RESULT_CARDS.map((card) => (
                  <motion.div
                    key={card}
                    variants={fadeUpItem}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    <Check className="h-4 w-4" />
                    {card}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
