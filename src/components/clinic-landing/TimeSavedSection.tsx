// src/components/clinic-landing/TimeSavedSection.tsx
"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "./shared/SectionHeading";
import AnimatedClock from "./shared/AnimatedClock";
import AnimatedCounter from "./shared/AnimatedCounter";

export default function TimeSavedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="dark-section py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Menos tiempo escribiendo"
          title="Recuperá el tiempo que perdías tipeando"
          subtitle="La IA convierte el dictado en una evolución clínica lista para firmar."
          dark
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <AnimatedClock rotateTo={360} duration={3} play={inView} size={110} accent="#94a3b8" />
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">Antes</p>
            <p className="text-3xl font-bold text-white">
              <AnimatedCounter to={30} duration={3} suffix=" min" />
            </p>
            <p className="text-sm text-white/60">Escribiendo la historia clínica a mano.</p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <AnimatedClock rotateTo={60} duration={0.6} play={inView} size={110} />
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>
              Después
            </p>
            <p className="text-3xl font-bold text-white">
              <AnimatedCounter to={5} duration={0.6} suffix=" min" />
            </p>
            <p className="text-sm text-white/60">Dictando y dejando que la IA redacte.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
