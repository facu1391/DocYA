// src/components/landing-public/nueva-landing/ComoFunciona.tsx
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  "Consultás GRATIS con IA",
  "Recibís orientación inmediata",
  "Si lo necesitás, solicitás atención",
  "DocYa asigna automáticamente al médico más cercano",
  "Te atienden en tu casa",
];

export default function ComoFunciona() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center">
        <motion.h2
          className="section-title mb-20 text-center"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          ¿Cómo funciona?
        </motion.h2>

        <div className="mx-auto hidden max-w-5xl items-start justify-between md:flex">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                className="flex w-36 flex-col items-center gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className="flex h-14 w-14 cursor-default items-center justify-center rounded-full border-2 text-2xl font-bold transition-all duration-300 hover:scale-110"
                  style={{
                    background: "#0a1622",
                    borderColor: "#0AE6C7",
                    color: "#0AE6C7",
                    boxShadow: "0 0 20px rgba(0,210,255,0.2)",
                  }}
                >
                  {i + 1}
                </div>
                <p className="text-base font-semibold leading-snug">{step}</p>
              </motion.div>

              {i < steps.length - 1 && <div className="step-line" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col items-center gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className="flex w-64 flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl font-bold"
                  style={{
                    background: "#0a1622",
                    borderColor: "#0AE6C7",
                    color: "#0AE6C7",
                  }}
                >
                  {i + 1}
                </div>
                <p className="text-base font-semibold">{step}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <div
                  className="my-1 h-8 w-0.5"
                  style={{
                    background: "linear-gradient(180deg, #0AE6C7, #00A6CE)",
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}