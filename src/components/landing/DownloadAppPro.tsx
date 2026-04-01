// src/components/landing/DownloadAppPro.tsx
"use client";

import CtaBand from "@/components/marketing/CtaBand";
import { Stethoscope, FileText } from "lucide-react";

export default function DownloadAppPro() {
  return (
    <CtaBand
      id="sumate"
      title="Sumate a DocYa Pro hfghfghg"
      subtitle="Elegí horarios y zonas. Atención a domicilio con herramientas digitales y pagos claros."
      actions={[
        { kind: "link", href: "/registro", label: "Registrate", variant: "primary", icon: <Stethoscope className="h-4 w-4" /> },
        { kind: "link", href: "#requisitos", label: "Ver requisitos", variant: "outline", icon: <FileText className="h-4 w-4" /> },
      ]}
      badges={["Ingresos semanales", "Elegís tu agenda", "Cobertura por zonas"]}
    />
  );
}
