import { ShieldCheck, Scale, Lock, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Validación profesional",
    desc: "Verificamos matrícula y credenciales antes de habilitar la cuenta.",
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Ley 25.326",
    desc: "Tratamiento de datos personales conforme normativa argentina.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Seguridad",
    desc: "Cifrado en tránsito y controles de acceso para proteger tu info.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Transparencia",
    desc: "Términos claros y comisiones visibles en todo momento.",
  },
];

export default function Trust() {
  return (
    <section className="py-14 md:py-16 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="container">
        <div className="surface rounded-3xl p-6 md:p-8 border max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">Confianza & respaldo</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <article key={it.title} className="flex gap-3">
                <span
                  className="
                    inline-flex h-10 w-10 items-center justify-center rounded-xl border
                    text-[var(--brand)]
                    bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                    border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                    shrink-0
                  "
                >
                  {it.icon}
                </span>
                <div>
                  <h3 className="font-medium">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
