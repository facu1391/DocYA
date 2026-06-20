import Image from "next/image";
import { Smartphone, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Descargas",
  description:
    "Descargá DocYa en tu celular. Disponible para iOS y Android, tanto para pacientes como para profesionales de la salud.",
  alternates: { canonical: "/descargas" },
  openGraph: {
    title: "Descargá DocYa",
    description:
      "Disponible para iOS y Android. Atención médica a domicilio desde tu celular.",
    url: "/descargas",
  },
};

const PACIENTE_APP_STORE =
  "https://apps.apple.com/ar/app/docya/id6753604975";
const PACIENTE_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

const PRO_APP_STORE =
  "https://apps.apple.com/ar/app/docyapro/id6753040185";
const PRO_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.docya.pro";

const APP_STORE_BADGE =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg";
const PLAY_STORE_BADGE =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg";

function StoreLinks({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl: string;
  playStoreUrl: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform hover:-translate-y-1"
      >
        <Image
          src={APP_STORE_BADGE}
          alt="Descargar en App Store"
          width={180}
          height={56}
          className="h-14 w-auto"
        />
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform hover:-translate-y-1"
      >
        <Image
          src={PLAY_STORE_BADGE}
          alt="Disponible en Google Play"
          width={180}
          height={56}
          className="h-14 w-auto"
        />
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="text-center">
          <span className="badge">Disponible en iOS y Android</span>
          <h1 className="section-title mt-4 mb-4">Descargá DocYa</h1>
          <p className="text-text-muted mx-auto mb-16 max-w-2xl text-lg leading-relaxed">
            Elegí la versión que necesitás y empezá a usar DocYa en minutos.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Pacientes */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand)]/10">
              <Smartphone className="h-7 w-7 text-[var(--brand)]" />
            </div>
            <h2 className="text-xl font-bold">DocYa para Pacientes</h2>
            <p className="text-text-muted mt-2 mb-6 text-sm leading-relaxed">
              Pedí un médico o enfermero/a a domicilio, accedé a teleconsultas y
              gestioná tus recetas y certificados desde tu celular.
            </p>
            <StoreLinks
              appStoreUrl={PACIENTE_APP_STORE}
              playStoreUrl={PACIENTE_PLAY_STORE}
            />
          </div>

          {/* Profesionales */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--brand)]/10">
              <Stethoscope className="h-7 w-7 text-[var(--brand)]" />
            </div>
            <h2 className="text-xl font-bold">DocYa Pro</h2>
            <p className="text-text-muted mt-2 mb-6 text-sm leading-relaxed">
              Recibí solicitudes de atención, gestioná tu agenda, emití recetas
              y certificados digitales con firma electrónica.
            </p>
            <StoreLinks
              appStoreUrl={PRO_APP_STORE}
              playStoreUrl={PRO_PLAY_STORE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
