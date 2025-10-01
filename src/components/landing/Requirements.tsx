"use client";

import Link from "next/link";
import { MapPin, UserCheck, Check, ArrowRight } from "lucide-react";

const buscados = [
  "Médicos jóvenes, residentes o con experiencia.",
  "Enfermeros con ganas de flexibilidad e ingresos extra.",
  "Vocación por atención domiciliaria y trato cercano.",
];

const zonas = ["Palermo", "Belgrano", "Próximamente: más barrios"];

export default function Requirements() {
  return (
    <section
      className="
        relative py-16 md:py-20
        bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]
      "
    >
      <div className="container">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Requisitos y zonas
        </h2>

        <div
          className="
            mt-8 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto
            motion-safe:animate-in motion-safe:fade-in-50
          "
        >
          {/* ¿A quién buscamos? */}
          <article
            className="
              group relative overflow-hidden rounded-2xl border p-6 md:p-7
              bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              transition-all duration-300 hover:-translate-y-1
              motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700
            "
          >
            <div
              className="
                pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300
                group-hover:opacity-100
                bg-[radial-gradient(600px_180px_at_left_top,rgba(0,179,166,0.18),transparent)]
                dark:bg-[radial-gradient(600px_180px_at_left_top,rgba(0,179,166,0.16),transparent)]
              "
            />
            <header className="relative flex items-center gap-3">
              <span
                className="
                  inline-flex h-10 w-10 items-center justify-center rounded-xl border
                  text-[var(--brand)]
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                "
              >
                <UserCheck className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-lg">¿A quién buscamos?</h3>
            </header>

            <ul className="relative mt-4 space-y-2.5 text-sm text-muted-foreground">
              {buscados.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-5">
              <Link href="/registro" className="btn-primary">
                Postularme ahora <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Zonas */}
          <article
            className="
              group relative overflow-hidden rounded-2xl border p-6 md:p-7
              bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              transition-all duration-300 hover:-translate-y-1
              motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-150
            "
          >
            <div
              className="
                pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300
                group-hover:opacity-100
                bg-[radial-gradient(600px_180px_at_left_top,rgba(0,179,166,0.18),transparent)]
                dark:bg-[radial-gradient(600px_180px_at_left_top,rgba(0,179,166,0.16),transparent)]
              "
            />
            <header className="relative flex items-center gap-3">
              <span
                className="
                  inline-flex h-10 w-10 items-center justify-center rounded-xl border
                  text-[var(--brand)]
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                "
              >
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-lg">Zonas de inicio</h3>
            </header>

            <p className="relative mt-3 text-sm text-muted-foreground">
              CABA (Palermo y Belgrano). Próxima expansión a más barrios y provincias.
            </p>

            <ul className="relative mt-4 flex flex-wrap items-center gap-2.5">
              {zonas.map((z) => (
                <li
                  key={z}
                  className="
                    inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium
                    text-[var(--brand)]
                    border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                    bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                  "
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {z}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
