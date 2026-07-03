// src/components/sections/EarningsExamples.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

const ARS = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const API =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://docya-railway-production.up.railway.app";

export default function EarningsExamples() {
  const [precio, setPrecio] = useState(30000);
  const [comision, setComision] = useState(20);

  useEffect(() => {
    let alive = true;
    fetch(`${API.replace(/\/$/, "")}/tarifas/consulta-medico`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        const monto = Number(data.monto);
        const porcentaje = Number(data.comision_porcentaje);
        if (Number.isFinite(monto) && monto > 0) setPrecio(monto);
        if (Number.isFinite(porcentaje)) setComision(porcentaje);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const escenarios = useMemo(() => {
    const netoPorConsulta = precio * (1 - comision / 100);
    return [
      { label: "8 consultas / semana", semanal: 8 * netoPorConsulta },
      { label: "12 consultas / semana", semanal: 12 * netoPorConsulta },
      { label: "20 consultas / semana", semanal: 20 * netoPorConsulta },
    ];
  }, [precio, comision]);

  return (
    <section className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="badge">Ejemplos</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Ejemplos ilustrativos
          </h2>

          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Escenarios estimados con precio de {ARS(precio)} y {comision.toLocaleString("es-AR")}% de comision
            (sin costos). Solo a modo orientativo.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {escenarios.map((s) => {
            const mensual = s.semanal * 4;

            return (
              <Card
                key={s.label}
                className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              >
                <p className="text-sm text-muted-foreground">{s.label}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm">Semanal</span>
                  <span className="font-semibold">{ARS(s.semanal)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="text-sm">Mensual (×4)</span>
                  <span className="text-xl font-bold">{ARS(mensual)}</span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Ajustá arriba tus propios costos/retenciones para un cálculo realista.
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
