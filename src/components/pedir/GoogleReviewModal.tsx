"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { usePedirTheme } from "./theme";

const GOOGLE_REVIEW_URL = "https://www.google.com/maps/place/Docya/@-34.5881905,-58.5046802,28631m/data=!3m1!1e3!4m8!3m7!1s0x227cfd3ecd2165ab:0xb45f693db877ce97!8m2!3d-34.5883596!4d-58.4222798!9m1!1b1!16s%2Fg%2F11zgshhbd1";

export function useGoogleReviewPrompt(consultaId: string, finalizada: boolean) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!finalizada || !consultaId) return;
    const key = `docya_google_review_prompted_${consultaId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // Si el navegador bloquea el almacenamiento, igualmente mostramos el pedido.
    }
    setOpen(true);
  }, [consultaId, finalizada]);

  return { open, close: () => setOpen(false) };
}

export default function GoogleReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { bg, text, muted, border, dark, logo } = usePedirTheme();
  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-5"
      style={{ background: "rgba(2, 12, 20, .76)", backdropFilter: "blur(8px)" }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="google-review-title"
        className="w-full max-w-md rounded-[28px] p-6 shadow-2xl sm:p-8"
        style={{ background: bg, color: text, border: `1px solid ${border}` }}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <Image src={logo} alt="DocYa" width={156} height={50} className="h-10 w-auto max-w-[170px] object-contain object-left" />
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "rgba(0,179,166,.14)", color: "#00b3a6" }}
          >
            <Star size={24} fill="currentColor" />
          </div>
        </div>
        <h2 id="google-review-title" className="text-xl font-extrabold leading-tight sm:text-2xl">
          ¡Gracias por confiar en DocYa! 💙
        </h2>
        <p className="mt-2 text-sm" style={{ color: muted }}>Tu consulta ha finalizado.</p>
        <p className="mt-6 text-base font-extrabold leading-snug">
          ¿Cómo fue tu experiencia con DocYa?
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
          Tu opinión nos ayuda a mejorar y también puede ayudar a otras personas a elegir nuestro servicio.
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-12 w-full items-center justify-center rounded-2xl px-4 text-center text-sm font-extrabold text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          style={{ background: "linear-gradient(90deg, #00a99d, #20cbbc)" }}
        >
          Dejar mi opinión en Google
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 min-h-11 w-full rounded-xl text-sm font-bold transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          style={{ color: dark ? "#b3c4c9" : "#475569" }}
        >
          Ahora no
        </button>
      </section>
    </div>
  );
}
