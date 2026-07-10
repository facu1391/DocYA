// src/components/clinic-landing/shared/AnimatedCounter.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./variants";

interface Props {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(from);
  const display = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration, ease: EASE_OUT });
    return controls.stop;
  }, [inView, to, duration, count, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
