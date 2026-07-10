// src/components/clinic-landing/shared/ScrollReveal.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./variants";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function ScrollReveal({ children, className, delay = 0, y = 40 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
