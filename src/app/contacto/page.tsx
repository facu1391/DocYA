
// src/app/contacto/page.tsx
import ContactHero from "@/components/contact/ContactHero";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto | DocYa Pro",
  description: "Escribinos para soporte, alianzas o prensa. Respondemos rápido.",
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <ContactHero />

      {/* Contenido centrado */}
      <section className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 max-w-5xl mx-auto">
          {/* Form a la izquierda (8 cols) */}
          <ContactForm />
          {/* Sidebar a la derecha (4 cols, sticky y oculto en mobile) */}
          <ContactSidebar />
        </div>
      </section>
    </main>
  );
}
