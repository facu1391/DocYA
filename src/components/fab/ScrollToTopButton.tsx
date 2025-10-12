
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Subir arriba"
      title="Subir arriba"
      className={[
        "fixed z-50 right-4 md:right-5",
        // lo ubicamos por encima del FloatingCTA para que no se pisen
        "h-11 w-11 rounded-full shadow-lg",
        "bg-[var(--brand)] text-[var(--brand-foreground)]",
        "hover:brightness-105 focus-visible:outline-none",
        "focus-visible:ring-4 focus-visible:ring-[color:rgb(0_179_166_/_0.3)]",
        "transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2",
        "flex items-center justify-center"
      ].join(" ")}
      // respetamos safe area (notch)
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
