
"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface InfoModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showIcon?: boolean;
}

export default function InfoModal({
  open,
  onOpenChange,
  title,
  description,
  actionText = "Entendido",
  onAction,
  showIcon = true,
}: InfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-md rounded-2xl
          bg-white dark:bg-zinc-900
          border border-[color-mix(in_srgb,var(--brand)_18%,transparent)]
          shadow-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            {showIcon && (
              <span className="inline-flex items-center justify-center size-6 rounded-full bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]">
                <Download className="size-4" aria-hidden="true" />
              </span>
            )}
            <span>{title}</span>
          </DialogTitle>
          {description ? (
            <DialogDescription className="text-zinc-600 dark:text-zinc-300">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => (onAction ? onAction() : onOpenChange(false))}
            className="
              bg-[var(--brand)] text-white hover:opacity-90
              dark:text-white
            "
          >
            {actionText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
