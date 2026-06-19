// src/components/landing-public/nueva-landing/CoberturaSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import CoberturaDynamic from "./CoberturaDynamic";
import { useI18n } from "@/lib/i18n/context";

type Zona = {
  id: number;
  nombre: string;
  detalle: string;
};

type ZonasResponse = {
  activas: Zona[];
  proximas: Zona[];
};

async function getZonas(): Promise<ZonasResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE ||
    process.env.NEXT_PUBLIC_API_URL ||
    "";

  if (!baseUrl) {
    console.error("No está definida NEXT_PUBLIC_API_BASE ni NEXT_PUBLIC_API_URL");
    return { activas: [], proximas: [] };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `${baseUrl.replace(/\/$/, "")}/zonas-cobertura`,
      {
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      console.error("Error al obtener zonas:", res.status, res.statusText);
      return { activas: [], proximas: [] };
    }

    const data = (await res.json()) as Partial<ZonasResponse>;

    return {
      activas: Array.isArray(data.activas) ? data.activas : [],
      proximas: Array.isArray(data.proximas) ? data.proximas : [],
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en getZonas:", error.message);
    } else {
      console.error("Error desconocido en getZonas");
    }

    return { activas: [], proximas: [] };
  } finally {
    clearTimeout(timeout);
  }
}

export default function CoberturaSection() {
  const { t } = useI18n();
  const [activas, setActivas] = React.useState<Zona[]>([]);
  const [proximas, setProximas] = React.useState<Zona[]>([]);

  React.useEffect(() => {
    getZonas().then(({ activas, proximas }) => {
      setActivas(activas);
      setProximas(proximas);
    });
  }, []);

  return (
    <section id="cobertura" className="py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="relative mx-auto" style={{ maxWidth: 380 }}>
            <div className="glass-card rounded-3xl p-0" style={{ position: "relative" }}>
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774897108/Dise%C3%B1o_sin_t%C3%ADtulo_25_fyhkln.png"
                alt={t.cobertura.altMapa}
                width={380}
                height={520}
                className="h-auto w-full rounded-3xl"
              />
            </div>

            <CoberturaDynamic />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="section-title mb-4">
            {t.cobertura.title}<span className="highlight-text">{t.cobertura.titleHighlight}</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            {t.cobertura.description}
          </p>

          <div className="mb-4 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#0AE6C7", boxShadow: "0 0 10px #0AE6C7" }}
            />
            <h4 className="text-lg font-bold">{t.cobertura.disponibleAhora}</h4>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {activas.length > 0 ? (
              activas.map((zona) => (
                <div
                  key={zona.id}
                  className="glass-card p-5"
                  style={{ borderColor: "rgba(10, 230, 199, 0.18)" }}
                >
                  <h5 className="mb-1 font-bold">{zona.nombre}</h5>
                  <p className="text-text-muted m-0 text-xs">{zona.detalle}</p>
                </div>
              ))
            ) : (
              <div className="text-text-muted text-sm">
                {t.cobertura.fallbackDisponible}
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.45)" }}
            />
            <h4 className="text-text-muted text-lg font-bold">{t.cobertura.proximamente}</h4>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 opacity-60">
            {proximas.length > 0 ? (
              proximas.map((zona) => (
                <span key={zona.id} className="badge text-sm">
                  {zona.nombre}
                </span>
              ))
            ) : (
              <span className="text-text-muted text-sm">
                {t.cobertura.fallbackProximamente}
              </span>
            )}
          </div>

          <div
            className="rounded-r-2xl px-6 py-5"
            style={{
              background: "rgba(0, 210, 255, 0.08)",
              borderLeft: "4px solid #0AE6C7",
            }}
          >
            <p className="m-0 text-base leading-relaxed">
              {t.cobertura.ctaTitle}
              <br />
              <strong>
                <a href="#" style={{ color: "var(--primary)" }} className="hover:underline">
                  {t.cobertura.ctaDescription}
                </a>
              </strong>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}