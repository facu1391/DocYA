// src/components/software-landing/SoftwareNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SOFTWARE_LOGO, SOFTWARE_PATH } from "./shared/variants";

export default function SoftwareNav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(7,17,31,0)", "rgba(7,17,31,0.92)"]);
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(248,250,252,0)", "rgba(248,250,252,0.1)"]
  );

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor: navBg, borderBottom: "1px solid", borderBottomColor: navBorder }}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href={SOFTWARE_PATH}
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sw-teal)]"
        >
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[var(--sw-bg2)]">
            <Image
              src={SOFTWARE_LOGO}
              alt="Docya Software logo"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[var(--sw-text)]">
            Docya Software
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[var(--sw-subtle)] transition-colors hover:text-[var(--sw-text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#software-contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--sw-teal-30)] transition-all duration-300 hover:brightness-110"
          >
            Solicitar una reunión
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="software-mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--sw-text)] lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="software-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--sw-border)] bg-[var(--sw-bg)] px-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base font-medium text-[var(--sw-subtle)] transition-colors hover:bg-white/5 hover:text-[var(--sw-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#software-contacto"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3 text-sm font-semibold text-white"
                >
                  Solicitar una reunión
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
