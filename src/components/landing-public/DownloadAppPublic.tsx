"use client";

import CtaBand from "@/components/marketing/CtaBand";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

const APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

export default function DownloadAppPublic() {
  return (
    <CtaBand
      id="descargar"
      title="Llevá tu salud al próximo nivel"
      subtitle="Descargá DocYa y accedé a profesionales verificados en minutos, sin esperas."
      actions={[
        {
          kind: "store-google",
          href: PLAY_STORE_URL,
        },
        {
          kind: "store-apple",
          href: APP_STORE_URL,
        },
      ]}
      badges={[
        "Profesionales verificados",
        "Atención en < 35 min",
        "Pagos seguros",
      ]}
    />
  );
}
