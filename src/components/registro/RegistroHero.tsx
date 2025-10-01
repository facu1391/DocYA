export default function RegistroHero() {
  return (
    <section className="border-b border-[var(--nav-border)] relative">
      <div className="absolute inset-0 pointer-events-none brand-glow" />
      <div className="container py-10 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Registro de profesionales
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2">
            Completá tus datos y te contactamos a la brevedad.
          </p>
        </div>
      </div>
    </section>
  );
}
