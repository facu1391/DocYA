// src/components/clinic-landing/WaitingRoomSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BellRing, Check, Volume2 } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import ScrollReveal from "./shared/ScrollReveal";
import VoiceWaveform from "./shared/VoiceWaveform";
import { ANCHORS } from "./shared/variants";

const CALLS = [
  { turn: "Turno A12", room: "Consultorio 2", doctor: "Dra. Fernández" },
  { turn: "Turno A13", room: "Consultorio 1", doctor: "Dr. Gómez" },
  { turn: "Turno A14", room: "Consultorio 3", doctor: "Dra. Ibáñez" },
];

const BENEFITS = [
  "El médico llama al próximo paciente con un clic, sin salir del consultorio.",
  "La pantalla de la sala anuncia el turno con voz y sonido: nadie tiene que levantarse a preguntar.",
  "Cada llamado se vincula al turno del día, así el estado pasa a \"en atención\" solo.",
];

type Phase = "idle" | "calling";

const CALL_DURATION = 3200;
const IDLE_DURATION = 1100;

export default function WaitingRoomSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (reduceMotion) {
      setPhase("calling");
      return;
    }
    if (!inView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const nextCall = () => {
      if (cancelled) return;
      setIndex((i) => (i + 1) % CALLS.length);
      showCall();
    };
    const goIdle = () => {
      if (cancelled) return;
      setPhase("idle");
      timers.push(setTimeout(nextCall, IDLE_DURATION));
    };
    function showCall() {
      if (cancelled) return;
      setPhase("calling");
      timers.push(setTimeout(goIdle, CALL_DURATION));
    }

    showCall();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduceMotion]);

  const call = CALLS[index];

  return (
    <section
      id={ANCHORS.salaDeEspera}
      ref={ref}
      className="scroll-mt-24 py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--background), color-mix(in srgb, var(--brand) 4%, var(--background)))",
      }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <ScrollReveal>
          <SectionHeading eyebrow="Sala de espera" title="Nadie más grita nombres en la sala" align="left" />
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
          <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
            <div className="relative flex h-7 items-center">
              <AnimatePresence>
                {phase === "calling" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl"
                    style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
                  >
                    <BellRing className="h-3.5 w-3.5" style={{ color: "var(--brand)" }} />
                    {call.doctor} llamó a {call.turn}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="glass-card relative flex w-full flex-col overflow-hidden p-0">
              <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-5 py-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-medium text-text-muted">Pantalla · Sala de espera</p>
              </div>

              <div className="relative flex h-56 flex-col items-center justify-center gap-2 px-5 py-6">
                <AnimatePresence mode="wait">
                  {phase === "calling" ? (
                    <motion.div
                      key={`call-${index}`}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.3 }}
                      className="relative flex flex-col items-center text-center"
                    >
                      <motion.span
                        className="absolute top-1/2 h-24 w-24 -translate-y-1/2 rounded-full"
                        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: [0.8, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute top-1/2 h-24 w-24 -translate-y-1/2 rounded-full"
                        style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                        initial={{ scale: 0.8, opacity: 0.6 }}
                        animate={{ scale: [0.8, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                      />

                      <span className="relative text-xs uppercase tracking-wide text-text-muted">Turno</span>
                      <span className="relative text-4xl font-bold text-foreground">{call.turn}</span>
                      <span className="relative mt-1 text-sm text-text-muted">
                        {call.room} · {call.doctor}
                      </span>

                      <div className="relative mt-3 flex items-center gap-2">
                        <Volume2 className="h-4 w-4" style={{ color: "var(--brand)" }} />
                        <VoiceWaveform active barCount={7} className="h-5" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-text-muted"
                    >
                      Esperando el próximo llamado…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
