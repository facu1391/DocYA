// src/components/contact/ContactHero.tsx
import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="relative border-b border-[var(--nav-border)] bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">¿Necesitás ayuda?</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Contacto</h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
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