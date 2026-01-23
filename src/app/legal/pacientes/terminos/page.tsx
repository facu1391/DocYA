import TerminosClient from "@/components/legal/pacientes/TerminosClient";

export const metadata = {
  title: "Términos y Condiciones",
  description: "Condiciones para el uso de la app DocYa por parte de pacientes en Argentina.",
  alternates: { canonical: "/legal/pacientes/terminos" },
  openGraph: {
    title: "Términos y Condiciones",
    description: "Reglas claras para usar DocYa como paciente o familiar.",
    url: "/legal/pacientes/terminos",
    type: "article",
  },
};

export default function Page() {
  return <TerminosClient />;
}
