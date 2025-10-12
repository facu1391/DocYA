
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  message?: string;
};

export default function LoadingSplash({ show, message = "Redirigiendo…" }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--hero-bg)]/90 dark:bg-[var(--hero-bg-dark)]/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Logo DocYa (cambia a tu ruta si querés) */}
            <div className="relative h-14 w-14">
              <Image
                src="/logo_puclic-light.png"
                alt="DocYa"
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>

            {/* spinner simple */}
            <div className="mt-1 h-6 w-6 rounded-full border-2 border-[var(--brand)] border-t-transparent animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
