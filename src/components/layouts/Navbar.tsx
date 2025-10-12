// src/components/layouts/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname() ?? "";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isPublicAudience = pathname === "/" || pathname.startsWith("/legal/pacientes");

  const LOGOS = isPublicAudience
    ? { light: "/logo_puclic-dark.png", dark: "/logo_puclic-light.png", alt: "DocYa" }
    : { light: "/logo-pro-dark.png", dark: "/logo-pro-light.png", alt: "DocYa Pro" };

  const logoHref = isPublicAudience ? "/" : "/profesionales";
  const logoAria = isPublicAudience ? "Ir a la Home pública" : "Ir a la Home de Profesionales";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const linkCls = (href: string) =>
    `transition-colors hover:text-[var(--brand)] ${
      pathname === href ? "text-[var(--brand)]" : "text-white"
    }`;

  // 👇 estilos centrados para mobile
  const mobileLinkCls = (href: string) =>
    [
      "w-full max-w-xs text-center rounded-full px-4 py-2 border transition",
      "border-white/10 text-white/90 hover:text-white hover:bg-white/10",
      pathname === href
        ? "border-[var(--brand)] text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_12%,transparent)]"
        : "",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b",
        "border-[var(--nav-border)]",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--nav-bg)_92%,transparent)] backdrop-blur"
          : "bg-[var(--nav-bg)]",
      ].join(" ")}
    >
      <nav className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={logoHref} className="flex items-center gap-2 shrink-0" aria-label={logoAria}>
          <div className="relative h-10 w-[150px] dark:hidden">
            <Image src={LOGOS.light} alt={LOGOS.alt} fill className="object-contain" priority />
          </div>
          <div className="relative h-10 w-[150px] hidden dark:block">
            <Image src={LOGOS.dark} alt={LOGOS.alt} fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {isPublicAudience ? (
            <Button
              variant="ghost" size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-white/10" aria-label="Cambiar tema"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          ) : (
            <>
              <Link href="/ingresos" className={linkCls("/ingresos")}>Ingresos</Link>
              <Link href="/faqs" className={linkCls("/faqs")}>FAQs</Link>
              <Link href="/contacto" className={linkCls("/contacto")}>Contacto</Link>
              <Link href="/registro" className="btn-primary h-9 px-3">Registrate</Link>
              <Link href="/" aria-label="Ir a DocYa (público)" className="btn-outline-primary h-9 px-3">
                Para pacientes
              </Link>
              <Button
                variant="ghost" size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-white/10" aria-label="Cambiar tema"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggles */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost" size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/10" aria-label="Cambiar tema"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {!isPublicAudience && (
            <Button
              variant="ghost" size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Abrir menú" aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu (solo Pro) */}
      {!isPublicAudience && (
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height] duration-300",
            open ? "max-h-96" : "max-h-0",
          ].join(" ")}
        >
          {/* 👇 centrado + pills */}
          <div className="container py-4 flex flex-col items-center text-center gap-3 text-sm font-medium">
            <Link href="/ingresos" className={mobileLinkCls("/ingresos")}>Ingresos</Link>
            <Link href="/faqs" className={mobileLinkCls("/faqs")}>FAQs</Link>
            <Link href="/contacto" className={mobileLinkCls("/contacto")}>Contacto</Link>

            <Link href="/registro" className="btn-primary h-10 w-full max-w-xs justify-center">
              Registrate
            </Link>

            <Link href="/" className="btn-outline-primary h-10 w-full max-w-xs justify-center" aria-label="Ir a DocYa (público)">
              Para pacientes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
