// src/components/landing-public/nueva-landing/PreciosSection.tsx
import { UserCheck, Star, Shield, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trust = [
  { icon: UserCheck, label: "Médicos reales" },
  { icon: Star, label: "Sistema de puntuación" },
  { icon: Shield, label: "Atención segura" },
  { icon: Zap, label: "Tecnología que agiliza la atención" },
];

type TarifaMedicoResponse = {
  monto: number;
  tipo: string;
};

async function getTarifaMedico(): Promise<TarifaMedicoResponse | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE ||
    process.env.NEXT_PUBLIC_API_URL ||
    "";

  if (!baseUrl) {
    console.error("No está definida NEXT_PUBLIC_API_BASE ni NEXT_PUBLIC_API_URL");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/tarifas/consulta-medico`, {
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("Error al obtener tarifa:", res.status, res.statusText);
      return null;
    }

    const data = (await res.json()) as TarifaMedicoResponse;

    if (
      typeof data !== "object" ||
      data === null ||
      typeof data.monto !== "number" ||
      typeof data.tipo !== "string"
    ) {
      console.error("Respuesta inválida en tarifa de médico:", data);
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en getTarifaMedico:", error.message);
    } else {
      console.error("Error desconocido en getTarifaMedico");
    }
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
    <section id="precios" className="py-32 dark-section">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">
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

              <h3 className="text-2xl font-bold mb-2">
                Consulta médica a domicilio
              </h3>

              <div
                className="text-5xl font-black my-6"
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
                <div
                  key={label}
                  className="flex items-center gap-5 text-xl font-semibold"
                >
                  <Icon
                    size={40}
                    style={{ color: "#0DF5E3" }}
                    className="flex-shrink-0"
                  />
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