
"use client";

import CtaBand from "@/components/marketing/CtaBand";

export default function DownloadAppPublic() {
  return (
    <CtaBand
      id="descargar"
      title="Llevá tu salud al próximo nivel"
      subtitle="Descargá DocYa y accedé a profesionales verificados en minutos, sin esperas."
      actions={[
        { kind: "store-google", href: "#" }, // 👉 poné tus enlaces reales
        { kind: "store-apple", href: "#" },
      ]}
      badges={["Profesionales verificados", "Atención en < 35 min", "Pagos seguros"]}
    />
  );
}
