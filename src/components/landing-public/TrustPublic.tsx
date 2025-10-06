
import { ShieldCheck, Clock, Star, Users } from "lucide-react";

export default function TrustPublic() {
  const stats = [
    { icon: <Users className="h-9 w-9" />, text: "+500 profesionales activos" },
    { icon: <Clock className="h-9 w-9" />, text: "Atención promedio en 35 min" },
    { icon: <Star className="h-9 w-9" />, text: "4.9 / 5 satisfacción de usuarios" },
    { icon: <ShieldCheck className="h-9 w-9" />, text: "Datos y privacidad protegidos" },
  ];

  return (
    <section className="py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] text-center">
      <h2 className="text-3xl font-bold mb-8">Confianza & respaldo</h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center w-56">
            <span
              className="
                inline-flex items-center justify-center rounded-xl h-14 w-14 mb-3
                text-[var(--brand)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                border border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
              "
            >
              {s.icon}
            </span>
            <p className="font-semibold">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
