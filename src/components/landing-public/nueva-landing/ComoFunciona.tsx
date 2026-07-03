// src/components/landing-public/nueva-landing/ComoFunciona.tsx
"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n/context";

export default function ComoFunciona() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = t.comoFunciona.steps;

  return (
    <section id="como-funciona" className="py-32">
      <div className="w-full max-w-[1200px] mx-auto px-6 text-center">
        <motion.h2
          className="section-title text-center mb-20"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {t.comoFunciona.title}
        </motion.h2>

        <div className="hidden md:flex justify-between items-start max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                className="flex flex-col items-center gap-5 w-36"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2 transition-all duration-300 hover:scale-110 cursor-default"
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

        <div className="flex md:hidden flex-col items-center gap-0">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className="flex flex-col items-center gap-3 w-64"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2"
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
                  className="w-0.5 h-8 my-1"
                  style={{ background: "linear-gradient(180deg, #0AE6C7, #00A6CE)", opacity: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}