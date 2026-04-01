// src/components/registro/RegistroHero.tsx
type Mode = "pro" | "paciente";

type Props = {
  mode?: Mode;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function RegistroHero({
  mode = "pro",
  title,
  subtitle,
  className = "",
  children,
}: Props) {
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
    <section
      className={`relative border-b border-[var(--nav-border)] bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">
                {mode === "paciente" ? "Pacientes" : "DocYa Pro"}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
              {resolvedTitle}
            </h1>

            <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
              {resolvedSubtitle}
            </p>

            {children ? <div className="mt-5">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}