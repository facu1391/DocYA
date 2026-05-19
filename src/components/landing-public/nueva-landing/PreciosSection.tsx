// src/components/landing-public/nueva-landing/PreciosSection.tsx
import Link from "next/link";
import { Stethoscope, Video, Syringe, Clock, Home, ShieldCheck, FileText, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type TarifaResponse = { monto: number; tipo: string; activa?: boolean };

async function getTarifas(): Promise<Record<string, TarifaResponse>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || "";
  if (!baseUrl) return {};
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/admin/tarifas`, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });
    if (!res.ok) return {};
    const data = (await res.json()) as TarifaResponse[];
    return data.reduce<Record<string, TarifaResponse>>((acc, tarifa) => {
      if (tarifa?.tipo && typeof tarifa.monto === "number" && tarifa.activa !== false) {
        acc[tarifa.tipo] = tarifa;
      }
      return acc;
    }, {});
  } catch {
    return {};
  } finally {
    clearTimeout(timeout);
  }
}

function formatPrecio(tarifa: TarifaResponse | undefined, fallback: string) {
  return tarifa ? `$${Number(tarifa.monto).toLocaleString("es-AR")}` : fallback;
}

export default async function PreciosSection() {
  const tarifas = await getTarifas();

  const servicios = [
    {
      icon: Stethoscope,
      badge: "Disponible ahora",
      titulo: "Médico a domicilio",
      subtitulo: "Un profesional va a tu casa.",
      precios: [
        { label: "Diurna", value: formatPrecio(tarifas.diurna, "$40.000") },
        { label: "Nocturna", value: formatPrecio(tarifas.nocturna, "$55.000") },
      ],
      descripcion: "Diagnóstico, recetas y tratamiento en el momento. Sin esperas en guardias.",
      chips: [
        { icon: Clock, label: "En minutos" },
        { icon: Home, label: "En tu casa" },
        { icon: ShieldCheck, label: "Profesionales verificados" },
      ],
      cta: "Solicitar médico",
      href: "/pedir",
      color: "#00b3a6",
      btnGradient: "linear-gradient(90deg, #00b3a6, #00d4c2)",
      iconBg: "rgba(0,179,166,0.15)",
      badgeBg: "rgba(0,179,166,0.15)",
      badgeColor: "#00d4c2",
    },
    {
      icon: Video,
      badge: "Sin espera",
      titulo: "Teleconsulta",
      subtitulo: "Consulta por videollamada.",
      precios: [
        { label: "Diurna", value: formatPrecio(tarifas.teleconsulta_diurna, "$20.000") },
        { label: "Nocturna", value: formatPrecio(tarifas.teleconsulta_nocturna, "$20.000") },
      ],
      descripcion: "Hablá con un médico desde tu computadora o celular, sin salir de casa. Recetas y certificados.",
      chips: [
        { icon: Clock, label: "En minutos" },
        { icon: ShieldCheck, label: "100% segura" },
        { icon: FileText, label: "Recetas y certificados" },
      ],
      cta: "Solicitar teleconsulta",
      href: "/pedir?tipo=teleconsulta",
      color: "#818cf8",
      btnGradient: "linear-gradient(90deg, #6366f1, #818cf8)",
      iconBg: "rgba(129,140,248,0.15)",
      badgeBg: "rgba(129,140,248,0.15)",
      badgeColor: "#a5b4fc",
    },
    {
      icon: Syringe,
      badge: "Profesionales verificados",
      titulo: "Enfermería a domicilio",
      subtitulo: "Atención profesional en tu hogar.",
      precios: [
        { label: "Diurna", value: formatPrecio(tarifas.diurna_enfermero, "$30.000") },
        { label: "Nocturna", value: formatPrecio(tarifas.nocturna_enfermero, "$30.000") },
      ],
      descripcion: "Inyectables, curaciones, controles y más. Profesionales certificados.",
      chips: [
        { icon: Clock, label: "En minutos" },
        { icon: Home, label: "En tu casa" },
        { icon: ShieldCheck, label: "Seguridad y confianza" },
      ],
      cta: "Solicitar enfermero",
      href: "/pedir?tipo=enfermero",
      color: "#f472b6",
      btnGradient: "linear-gradient(90deg, #ec4899, #f472b6)",
      iconBg: "rgba(244,114,182,0.15)",
      badgeBg: "rgba(244,114,182,0.15)",
      badgeColor: "#f9a8d4",
    },
  ];

  return (
    <section id="precios" className="py-32 dark-section">
      <div className="w-full max-w-[1200px] mx-auto px-6">

        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="badge mb-4 inline-flex">Precios transparentes</span>
            <h2 className="section-title text-white mb-4">
              Elegí cómo querés ser <span className="highlight-text">atendido</span>
            </h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Sin sorpresas. El precio que ves es el que pagás.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map(
            (
              { icon: Icon, badge, titulo, subtitulo, precios, descripcion, chips, cta, href,
                color, btnGradient, iconBg, badgeBg, badgeColor },
              i
            ) => (
              <ScrollReveal key={titulo} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(8, 28, 36, 0.85)",
                    borderColor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Header: icono + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: iconBg }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: badgeBg, color: badgeColor }}
                    >
                      {badge}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-white mb-1">{titulo}</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {subtitulo}
                  </p>

                  {/* Fila de precio */}
                  <div
                    className="rounded-2xl px-4 py-3 mb-4 space-y-2"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {precios.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                          {label}
                        </span>
                        <span className="text-xl font-black" style={{ color }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Descripción */}
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {descripcion}
                  </p>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {chips.map(({ icon: ChipIcon, label }) => (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.06)" }}
                      >
                        <ChipIcon size={11} />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Botón CTA */}
                  <Link
                    href={href}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ background: btnGradient }}
                  >
                    {cta}
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </ScrollReveal>
            )
          )}
        </div>

      </div>
    </section>
  );
}
