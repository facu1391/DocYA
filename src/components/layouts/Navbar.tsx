// src/components/layouts/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, Locale } from "@/lib/i18n/context";

import ConfirmModal from "@/components/common/ConfirmModal";
import LoadingSplash from "@/components/common/LoadingSplash";
import { proExitCopy } from "@/components/common/confirmCopy";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [openExitModal, setOpenExitModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const PUBLIC_PREFIXES = ["/", "/registro/paciente", "/legal/pacientes"];

  const aud = (searchParams?.get("aud") || "").toLowerCase();
  const isGraciasPaciente = pathname === "/gracias" && aud === "paciente";

  const isPublicAudience =
    isGraciasPaciente ||
    PUBLIC_PREFIXES.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));

  const inProArea = !isPublicAudience;

  const LOGOS = isPublicAudience
    ? { light: "/logo_puclic-light.png", dark: "/logo_puclic-light.png", alt: "DocYa" }
    : { light: "/logo-pro-dark.png", dark: "/logo-pro-light.png", alt: "DocYa Pro" };

  const logoHref = isPublicAudience ? "/" : "/profesionales";
  const logoAria = isPublicAudience ? "Ir a la Home pública" : "Ir a la Home de Profesionales";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkCls = (href: string) =>
    `transition-colors hover:text-[var(--brand)] ${
      pathname === href ? "text-[var(--brand)]" : "text-white"
    }`;

  const mobileLinkCls = (href: string) =>
    [
      "w-full max-w-xs text-center rounded-full px-4 py-2 border transition",
      "border-white/10 text-white/90 hover:text-white hover:bg-white/10",
      pathname === href
        ? "border-[var(--brand)] text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_12%,transparent)]"
        : "",
    ].join(" ");

  const publicSectionCls =
    "text-sm font-medium text-white/85 transition-colors hover:text-[var(--brand)]";

  const publicMobileSectionCls =
    "w-full max-w-xs text-center rounded-full px-4 py-2 border transition border-white/10 text-white/90 hover:text-white hover:bg-white/10";

  const goPatients = () => {
    setLoading(true);
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 w-full border-b",
          "border-[var(--nav-border)]",
          scrolled
            ? "bg-[color-mix(in_srgb,var(--nav-bg)_92%,transparent)] backdrop-blur"
            : "bg-[var(--nav-bg)]",
        ].join(" ")}
      >
        <nav className="container flex h-16 items-center justify-between">
          <Link href={logoHref} className="flex shrink-0 items-center gap-2" aria-label={logoAria}>
            <div className="relative h-10 w-[150px] dark:hidden">
              <Image src={LOGOS.light} alt={LOGOS.alt} fill className="object-contain" priority />
            </div>
            <div className="relative hidden h-10 w-[150px] dark:block">
              <Image src={LOGOS.dark} alt={LOGOS.alt} fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {isPublicAudience ? (
              <>
                <a href="#inicio" className={publicSectionCls}>
                  {t.nav.inicio}
                </a>
                <a href="#ia" className={publicSectionCls}>
                  {t.nav.iaMedica}
                </a>
                <a href="#como-funciona" className={publicSectionCls}>
                  {t.nav.comoFunciona}
                </a>
                <a href="#cobertura" className={publicSectionCls}>
                  {t.nav.cobertura}
                </a>
                <a href="#precios" className={publicSectionCls}>
                  {t.nav.precios}
                </a>

                <Link href="/profesionales" className={publicSectionCls}>
                  {t.nav.profesionales}
                </Link>

                <a href="#descargar" className="btn-primary h-9 px-4">
                  {t.nav.descargarApp}
                </a>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocale(locale === "es" ? "en" : "es")}
                  className="text-white hover:bg-white/10 cursor-pointer"
                  aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
                  title={locale === "es" ? "English" : "Español"}
                >
                  <Globe className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold uppercase leading-none">
                    {locale === "es" ? "EN" : "ES"}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-white hover:bg-white/10 cursor-pointer"
                  aria-label={t.nav.cambiarTema}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/ingresos" className={linkCls("/ingresos")}>
                  Ingresos
                </Link>
                <Link href="/faqs" className={linkCls("/faqs")}>
                  FAQs
                </Link>
                <Link href="/manual" className={linkCls("/manual")}>
                  Manual
                </Link>
                <Link href="/contacto" className={linkCls("/contacto")}>
                  Contacto
                </Link>
                <Link href="/registro" className="btn-primary h-9 px-3">
                  Registrate
                </Link>

                <Link
                  href="/"
                  aria-label="Ir a DocYa (público)"
                  className="btn-outline-primary h-9 px-3"
                  onClick={(e) => {
                    if (inProArea) {
                      e.preventDefault();
                      setOpenExitModal(true);
                    }
                  }}
                >
                  Para pacientes
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Cambiar tema"
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
              variant="ghost"
              size="icon"
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="text-white hover:bg-white/10 relative"
              aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold uppercase leading-none">
                {locale === "es" ? "EN" : "ES"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-white/10"
              aria-label={t.nav.cambiarTema}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
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
            <div className="container py-4 flex flex-col items-center text-center gap-3 text-sm font-medium">
              <Link href="/ingresos" className={mobileLinkCls("/ingresos")}>
                Ingresos
              </Link>
              <Link href="/faqs" className={mobileLinkCls("/faqs")}>
                FAQs
              </Link>
              <Link href="/manual" className={mobileLinkCls("/manual")}>
                Manual
              </Link>
              <Link href="/contacto" className={mobileLinkCls("/contacto")}>
                Contacto
              </Link>

              <Link href="/registro" className="btn-primary h-10 w-full max-w-xs justify-center">
                Registrate
              </Link>

              <Link
                href="/"
                className="btn-outline-primary h-10 w-full max-w-xs justify-center"
                aria-label="Ir a DocYa (público)"
                onClick={(e) => {
                  if (inProArea) {
                    e.preventDefault();
                    setOpenExitModal(true);
                  }
                }}
              >
                Para pacientes
              </Link>
            </div>
          </div>
        )}

        {/* Mobile menu (público) */}
        {isPublicAudience && (
          <div
            className={[
              "md:hidden overflow-hidden transition-[max-height] duration-300",
              open ? "max-h-[420px]" : "max-h-0",
            ].join(" ")}
          >
            <div className="container py-4 flex flex-col items-center text-center gap-3 text-sm font-medium">
              <a href="#inicio" className={publicMobileSectionCls}>
                {t.nav.inicio}
              </a>
              <a href="#ia" className={publicMobileSectionCls}>
                {t.nav.iaMedica}
              </a>
              <a href="#como-funciona" className={publicMobileSectionCls}>
                {t.nav.comoFunciona}
              </a>
              <a href="#cobertura" className={publicMobileSectionCls}>
                {t.nav.cobertura}
              </a>
              <a href="#precios" className={publicMobileSectionCls}>
                {t.nav.precios}
              </a>
              <Link href="/profesionales" className={publicMobileSectionCls}>
                {t.nav.profesionales}
              </Link>
              <a href="#descargar" className="btn-primary h-10 w-full max-w-xs justify-center">
                {t.nav.descargarApp}
              </a>
            </div>
          </div>
        )}
      </header>

      <LoadingSplash
        show={loading}
        message="Abriendo Pacientes…"
        autoHideMs={2200}
        onHide={() => setLoading(false)}
        logoSrc="/logo_puclic-light.png"
      />

      <ConfirmModal
        open={openExitModal}
        onOpenChange={setOpenExitModal}
        title={proExitCopy.title}
        description={proExitCopy.description}
        confirmText={proExitCopy.confirmText}
        cancelText={proExitCopy.cancelText}
        onConfirm={() => {
          setOpenExitModal(false);
          goPatients();
        }}
        onCancel={() => setOpenExitModal(false)}
      />
    </>
  );
}
