// src/components/clinic-landing/ClinicNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ANCHORS, CLINIC_LOGO, CTA_DEMO_HREF } from "./shared/variants";

const NAV_LINKS = [
  { label: "Cómo funciona", href: `#${ANCHORS.comoFunciona}` },
  { label: "WhatsApp IA", href: `#${ANCHORS.whatsapp}` },
  { label: "Teleconsulta", href: `#${ANCHORS.teleconsulta}` },
  { label: "Funcionalidades", href: `#${ANCHORS.funcionalidades}` },
];

export default function ClinicNav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(10,39,44,0)", "rgba(10,39,44,0.92)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(15,53,61,0)", "rgba(15,53,61,1)"]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor: navBg, borderBottom: "1px solid", borderBottomColor: navBorder }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/clinic" className="flex items-center" aria-label="DocYa Clinic">
          <Image
            src={CLINIC_LOGO}
            alt="DocYa Clinic"
            width={132}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href={CTA_DEMO_HREF} className="btn-primary">
            Solicitar Demo
          </Link>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0a272c] px-6 md:hidden"
          >
            <ul className="flex flex-col gap-4 py-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={CTA_DEMO_HREF}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Solicitar Demo
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
