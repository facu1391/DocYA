// src/components/landing-public/nueva-landing/PreciosSection.tsx
import { UserCheck, Star, Shield, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trust = [
  { icon: UserCheck, label: "Médicos reales" },
  { icon: Star, label: "Sistema de puntuación" },
  { icon: Shield, label: "Atención segura" },
  { icon: Zap, label: "Tecnología que agiliza la atención" },
];

async function getTarifaMedico(): Promise<{ monto: number; tipo: string } | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(`${baseUrl}/tarifas/consulta-medico`, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function PreciosSection() {
  const tarifa = await getTarifaMedico();

  const precioFormateado = tarifa
    ? `$${Number(tarifa.monto).toLocaleString("es-AR")}`
    : "desde $30.000";

  const esNocturno = tarifa?.tipo === "nocturna";

  return (
    <section className="dark-section py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <ScrollReveal>
            <div
              className="glass-card text-center"
              style={{
                borderColor: "#0AE6C7",
                boxShadow: "0 0 30px rgba(0,210,255,0.1)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,210,255,0.05) 100%)",
              }}
            >
              <span className="badge mb-4 inline-flex">Transparente</span>
              <h3 className="mb-2 text-2xl font-bold">Consulta médica a domicilio</h3>

              <div
                className="my-6 text-5xl font-black"
                style={{
                  background: "linear-gradient(135deg, #0AE6C7, #00A6CE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {precioFormateado}
              </div>

              <p className="text-text-muted text-lg">
                {esNocturno
                  ? "Tarifa nocturna (22:00 – 06:00)"
                  : "Solo pagás si necesitás atención médica real"}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-8">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-5 text-xl font-semibold">
                  <Icon size={40} style={{ color: "var(--accent)" }} className="shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}