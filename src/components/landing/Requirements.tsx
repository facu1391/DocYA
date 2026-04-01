// src/components/landing/Requirements.tsx
"use client";

import Link from "next/link";
import { MapPin, UserCheck, Check, ArrowRight } from "lucide-react";

const buscados = [
  "Médicos jóvenes, residentes o con experiencia.",
  "Enfermeros con ganas de flexibilidad e ingresos extra.",
  "Vocación por atención domiciliaria y trato cercano.",
];

const zonas = [
  "Cobertura nacional",
  "Operativo en expansión continua",
  "Atención en todas las provincias",
];

export default function Requirements() {
  return (
    <section className="relative bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge">Requisitos y alcance</span>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Requisitos y cobertura
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Una propuesta abierta para profesionales con vocación, criterio clínico y ganas de trabajar con libertad.
          </p>
        </div>

        <div
          className="
            mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2
            motion-safe:animate-in motion-safe:fade-in-50
          "
        >
          <article
            className="
              group relative overflow-hidden rounded-3xl border p-6 md:p-7
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
                  inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                  text-[var(--brand)]
                "
              >
                <UserCheck className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">¿A quién buscamos?</h3>
            </header>

            <ul className="relative mt-5 space-y-3 text-sm text-muted-foreground">
              {buscados.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-6">
              <Link href="/registro" className="btn-primary h-10 px-4">
                Postularme ahora <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article
            className="
              group relative overflow-hidden rounded-3xl border p-6 md:p-7
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
                  inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                  text-[var(--brand)]
                "
              >
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Cobertura nacional</h3>
            </header>

            <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
              Operamos en todo el territorio argentino, con expansión continua y
              cobertura en cada provincia.
            </p>

            <ul className="relative mt-5 flex flex-wrap items-center gap-2.5">
              {zonas.map((z) => (
                <li
                  key={z}
                  className="
                    inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium
                    border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                    bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                    text-[var(--brand)]
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