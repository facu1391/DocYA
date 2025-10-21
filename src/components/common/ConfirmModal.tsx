
"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Sí, continuar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        onOpenChange(false);
        onCancel?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange, onCancel]);

  // Cerrar click fuera
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
      onCancel?.();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          onMouseDown={onBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="relative z-[61] w-[92vw] max-w-md surface border rounded-2xl p-6"
            initial={{ y: 12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <button
              aria-label="Cerrar"
              className="absolute right-3 top-3 rounded-md p-1 hover:bg-white/10 cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                onCancel?.();
              }}
            >
              <X className="h-5 w-5" />
            </button>

            <h3 id="confirm-title" className="text-lg font-semibold">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn-outline-primary cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                  onCancel?.();
                }}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className="btn-primary cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                  onConfirm();
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
