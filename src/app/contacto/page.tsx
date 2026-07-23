// src/app/contacto/page.tsx
import ContactHero from "@/components/contact/ContactHero";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto",
  description: "Escribinos para soporte, alianzas o prensa. Respondemos rápido.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto",
    description: "Soporte, alianzas o prensa. Respondemos rápido.",
    url: "/contacto",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const isClinic = ref === "clinic";

  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <ContactHero isClinic={isClinic} />

      <section className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-12 lg:items-start">
            <ContactForm isClinic={isClinic} />
            <ContactSidebar />
          </div>
        </div>
      </section>
    </main>
  );
}