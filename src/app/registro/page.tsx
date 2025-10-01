import RegistroHero from "@/components/registro/RegistroHero";
import RegistroForm from "@/components/registro/RegistroForm";

export const metadata = {
  title: "Registro de profesionales | DocYa Pro",
  description: "Postulate como médico/a o enfermero/a y empezá a recibir consultas a domicilio.",
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <RegistroHero />
      <section className="container relative flex justify-center px-3 sm:px-4 md:px-6 py-10 md:py-14">
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <RegistroForm />
        </div>
      </section>
    </main>
  );
}
