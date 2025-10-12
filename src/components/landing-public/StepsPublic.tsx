
import { Smartphone, Stethoscope, Home } from "lucide-react";

export default function StepsPublic() {
  const steps = [
    { icon: <Smartphone className="h-9 w-9" />, title: "1. Solicitá tu consulta", desc: "Pedí atención desde la app o la web." },
    { icon: <Stethoscope className="h-9 w-9" />, title: "2. Profesional asignado", desc: "El más cercano acepta tu pedido." },
    { icon: <Home className="h-9 w-9" />, title: "3. Atención en casa", desc: "Recibí atención en minutos." },
  ];

  return (
    <section className="py-16 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] text-center">
      <h2 className="text-3xl font-bold mb-8">Cómo funciona</h2>
      <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center max-w-xs">
            <div
              className="
                inline-flex items-center justify-center rounded-xl h-14 w-14 mb-4
                text-[var(--brand)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                border border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
              "
            >
              {s.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
