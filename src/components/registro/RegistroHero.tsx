// src/components/registro/RegistroHero.tsx
type Mode = "pro" | "paciente";

type Props = {
  /** Modo semántico: ajusta textos por defecto */
  mode?: Mode; // default: "pro"
  /** Título a mostrar (si no lo pasás, se resuelve por mode) */
  title?: string;
  /** Subtítulo a mostrar (si no lo pasás, se resuelve por mode) */
  subtitle?: string;
  /** Clases extra para ajustar paddings/márgenes si hace falta */
  className?: string;
  /** Slot opcional para renderizar CTA u otros elementos debajo del subtítulo */
  children?: React.ReactNode;
};

export default function RegistroHero({
  mode = "pro",
  title,
  subtitle,
  className = "",
  children,
}: Props) {
  // Defaults por modo (sin romper lo existente)
  const resolvedTitle =
    title ??
    (mode === "paciente"
      ? "Registro de pacientes"
      : "Registro de profesionales");

  const resolvedSubtitle =
    subtitle ??
    (mode === "paciente"
      ? "Registrate gratis y accedé a atención médica y de enfermería a domicilio."
      : "Completá tus datos y te contactamos a la brevedad.");

  return (
    <section className={`border-b border-[var(--nav-border)] relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none brand-glow" />
      <div className="container py-10 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            {resolvedTitle}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2">
            {resolvedSubtitle}
          </p>

          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

