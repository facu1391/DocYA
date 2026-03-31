// src/components/landing-public/nueva-landing/ScrollReveal.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.5, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}