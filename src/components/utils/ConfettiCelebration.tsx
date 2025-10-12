"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function ConfettiCelebration({ fire }: { fire: boolean }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!fire || firedRef.current) return;
    firedRef.current = true;

    const duration = 1200;
    const end = Date.now() + duration;

    const tick = () => {
      confetti({ particleCount: 40, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
      confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [fire]);

  return null;
}
