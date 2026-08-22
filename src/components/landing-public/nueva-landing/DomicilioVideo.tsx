"use client";

import { useEffect, useRef } from "react";

const DESKTOP_VIDEO = "/videos/docya-medico-desktop.mp4";
const MOBILE_VIDEO = "/videos/docya-medico-mobile.mp4";

export default function DomicilioVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isNearViewport = false;

    const removeSource = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.dataset.source = "";
    };

    const syncVideo = () => {
      if (!isNearViewport || reducedMotionQuery.matches) {
        if (video.dataset.source) removeSource();
        return;
      }

      const source = desktopQuery.matches ? DESKTOP_VIDEO : MOBILE_VIDEO;
      if (video.dataset.source !== source) {
        video.src = source;
        video.dataset.source = source;
        video.load();
      }

      void video.play().catch(() => {
        // Autoplay can still be blocked by browser or OS policy.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        syncVideo();
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );

    observer.observe(video);
    desktopQuery.addEventListener("change", syncVideo);
    reducedMotionQuery.addEventListener("change", syncVideo);

    return () => {
      observer.disconnect();
      desktopQuery.removeEventListener("change", syncVideo);
      reducedMotionQuery.removeEventListener("change", syncVideo);
      removeSource();
    };
  }, []);

  return (
    <div className="glass-card relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-3xl bg-background/60 p-0 md:aspect-video md:max-w-none">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label="Animación del proceso de asignación del médico disponible más cercano y su recorrido hacia el domicilio del paciente"
      />
    </div>
  );
}
