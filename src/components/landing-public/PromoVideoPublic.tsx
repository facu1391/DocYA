"use client";

import { useEffect, useRef } from "react";

export default function PromoVideoPublic() {
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = true;
    v.playsInline = true;
    const play = async () => {
      try {
        await v.play();
      } catch {
        // ignorar si el navegador bloquea autoplay
      }
    };
    play();
  }, []);

  return (
    <section className="relative">
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-none md:rounded-[24px]">
        <video
          ref={vidRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/video1.mp4"
          preload="auto"
          muted
          playsInline
          autoPlay
          loop
          controls={false}
        />

        {/* Overlays para contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15" />

        {/* Contenido */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center p-6">
          <div className="w-full max-w-4xl text-center md:text-left">
            <h2 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow">
              Tu salud, a un toque
            </h2>
            <p className="mt-3 text-white/90 text-base md:text-lg drop-shadow">
              Tu consulta médica sin guardias ni turnos. De la app a tu hogar, en minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
