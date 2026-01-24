import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="border-b border-[var(--nav-border)] relative bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative py-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">¿Necesitás ayuda?</span>
            </div>

            <h1 className="mt-4 text-2xl md:text-4xl font-semibold">Contacto</h1>

            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Escribinos y te respondemos. También podés consultar las{" "}
              <Link href="/faqs" className="link-primary">
                FAQs
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
