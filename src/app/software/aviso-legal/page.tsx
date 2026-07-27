// src/app/software/aviso-legal/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de Docya Software.",
  alternates: { canonical: "/software/aviso-legal" },
};

export default function SoftwareAvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 lg:px-8">
      <h1 className="text-3xl font-bold text-[var(--sw-text)] sm:text-4xl">Aviso legal</h1>
      <div className="mt-8 space-y-6 text-[var(--sw-subtle)]">
        <p>
          Docya Software es una unidad de desarrollo de software de DocYa
          especializada en soluciones personalizadas para el ecosistema
          Atlassian. El acceso y uso de esta sección del sitio implica la
          aceptación de las condiciones descritas en este aviso legal.
        </p>
        <p>
          Los contenidos, textos, gráficos y elementos de esta sección son
          propiedad de DocYa o de terceros que han autorizado su uso, y están
          protegidos por la normativa vigente en materia de propiedad
          intelectual.
        </p>
        <p>
          Atlassian, Jira, Jira Service Management y Confluence son marcas
          comerciales de Atlassian Pty Ltd. Su mención en este sitio tiene
          fines descriptivos y no implica afiliación, patrocinio ni respaldo
          oficial por parte de Atlassian.
        </p>
        <p>
          Este documento es un texto base y debe ser revisado y adaptado por
          un profesional legal antes de su publicación definitiva.
        </p>
      </div>
    </div>
  );
}
