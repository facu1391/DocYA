// src/components/clinic-landing/shared/AnimatedClock.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  rotateTo: number;
  duration: number;
  play: boolean;
  size?: number;
  accent?: string;
}

const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

export default function AnimatedClock({ rotateTo, duration, play, size = 120, accent = "var(--brand)" }: Props) {
  const reduceMotion = useReducedMotion();
  const r = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 4} fill="none" stroke="var(--border)" strokeWidth={2} />
      {TICKS.map((deg) => (
        <line
          key={deg}
          x1={r}
          y1={6}
          x2={r}
          y2={12}
          stroke="var(--text-muted)"
          strokeWidth={2}
          transform={`rotate(${deg} ${r} ${r})`}
        />
      ))}
      <motion.line
        x1={r}
        y1={r}
        x2={r}
        y2={16}
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        style={{ transformOrigin: `${r}px ${r}px` }}
        initial={{ rotate: 0 }}
        animate={play ? { rotate: reduceMotion ? rotateTo : rotateTo } : { rotate: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration, ease: "linear" }}
      />
      <circle cx={r} cy={r} r={4} fill={accent} />
    </svg>
  );
}
