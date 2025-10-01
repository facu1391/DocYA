
import FAQs from "@/components/sections/FAQs";

export const metadata = {
  title: "Preguntas frecuentes | DocYa Pro",
  description: "Respuestas rápidas sobre pagos, disponibilidad, requisitos y más.",
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <FAQs />
    </main>
  );
}
