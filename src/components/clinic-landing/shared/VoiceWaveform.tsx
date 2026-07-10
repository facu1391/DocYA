// src/components/clinic-landing/shared/VoiceWaveform.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  active?: boolean;
  barCount?: number;
  className?: string;
  color?: string;
}

const HEIGHT_RATIOS = [0.4, 0.75, 1, 0.55, 0.9, 0.35, 0.65, 0.5, 0.8];

export default function VoiceWaveform({
  active = true,
  barCount = 7,
  className = "",
  color = "var(--brand)",
}: Props) {
  const reduceMotion = useReducedMotion();
  const bars = Array.from({ length: barCount }, (_, i) => HEIGHT_RATIOS[i % HEIGHT_RATIOS.length]);

  return (
    <div className={`flex h-10 items-end gap-1 ${className}`} aria-hidden="true">
      {bars.map((ratio, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full will-change-transform"
          style={{ background: color, height: "100%", transformOrigin: "bottom" }}
          initial={{ scaleY: 0.25 }}
          animate={
            active && !reduceMotion
              ? { scaleY: [0.25, ratio, 0.25] }
              : { scaleY: active ? ratio : 0.25 }
          }
          transition={
            active && !reduceMotion
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }
              : { duration: 0.3, ease: "easeOut" }
          }
        />
      ))}
    </div>
  );
}
