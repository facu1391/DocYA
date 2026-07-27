// src/app/software/politica-de-privacidad/page.tsx
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/components/software-landing/shared/variants";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Docya Software.",
  alternates: { canonical: "/software/politica-de-privacidad" },
};

export default function SoftwarePoliticaPrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--sw-text)] sm:text-4xl">
        Política de privacidad
      </h1>
      <div className="mt-8 space-y-6 text-[var(--sw-subtle)]">
        <p>
          En Docya Software respetamos la privacidad de quienes se contactan
          con nosotros a través de esta sección del sitio. Esta política
          describe, de forma general, cómo tratamos la información recibida a
          través del formulario de contacto.
        </p>
        <p>
          Los datos ingresados en el formulario (nombre, empresa, correo
          corporativo, país y descripción de la necesidad) se utilizan
          exclusivamente para evaluar la consulta comercial y responder al
          solicitante. No compartimos esta información con terceros ajenos al
          proceso de evaluación y desarrollo del proyecto.
        </p>
        <p>
          Podés solicitar la eliminación o corrección de tus datos
          escribiendo a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--sw-teal)] hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          Este documento es un texto base y debe ser revisado y adaptado por
          un profesional legal antes de su publicación definitiva.
        </p>
      </div>
    </div>
  );
}
