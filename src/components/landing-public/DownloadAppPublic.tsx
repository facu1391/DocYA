"use client";

import { useState } from "react";
import CtaBand from "@/components/marketing/CtaBand";
import InfoModal from "@/components/common/InfoModal";
import { appDownloadCopy } from "@/components/common/confirmCopy";

export default function DownloadAppPublic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CtaBand
        id="descargar"
        title="Llevá tu salud al próximo nivel"
        subtitle="Descargá DocYa y accedé a profesionales verificados en minutos, sin esperas."
        actions={[
          {
            kind: "store-google",
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setOpen(true);
            },
          },
          {
            kind: "store-apple",
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              setOpen(true);
            },
          },
        ]}
        badges={["Profesionales verificados", "Atención en < 35 min", "Pagos seguros"]}
      />

      <InfoModal
        open={open}
        onOpenChange={setOpen}
        title={appDownloadCopy.title}
        description={appDownloadCopy.description}
        actionText={appDownloadCopy.confirmText}
      />
    </>
  );
}
