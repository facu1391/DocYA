import PrivacidadClient from "@/components/legal/pacientes/PrivacidadClient";

export const metadata = {
  title: "Política de Privacidad",
  description: "Cómo tratamos los datos personales de usuarios/pacientes en DocYa.",
  alternates: { canonical: "/legal/pacientes/privacidad" },
  openGraph: {
    title: "Política de Privacidad",
    description: "Tratamiento de datos personales conforme Ley 25.326.",
    url: "/legal/pacientes/privacidad",
    type: "article",
  },
};

export default function Page() {
  return <PrivacidadClient />;
}
