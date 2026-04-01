// src/components/landing-public/nueva-landing/FinalCTA.tsx
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

type FinalCTAMode = "paciente" | "pro";

type Props = {
  mode?: FinalCTAMode;
};

const PACIENTE_APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

const PACIENTE_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

/* 👇 reemplazá estas URLs por las reales de la app profesional */
const PRO_APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

const PRO_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.medico";

export default function FinalCTA({ mode = "paciente" }: Props) {
  const isPro = mode === "pro";

  const appStoreUrl = isPro ? PRO_APP_STORE_URL : PACIENTE_APP_STORE_URL;
  const playStoreUrl = isPro ? PRO_PLAY_STORE_URL : PACIENTE_PLAY_STORE_URL;

  const title = isPro ? "Sumate a DocYa Pro hoy" : "Probá DocYa gratis ahora";

  const subtitle = isPro
    ? "Descargá la app profesional, activá tu disponibilidad y empezá a recibir consultas."
    : "Consultá con IA sin costo y, si lo necesitás, recibí al médico más cercano en tu domicilio.";

  return (
    <section id="descargar" className="relative overflow-hidden py-32 md:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(58,134,255,0.2) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 text-center">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <span className="badge">{isPro ? "DocYa Pro" : "Descargá la app"}</span>

            <h2 className="section-title mt-4 mb-4 text-center">
              {title}
            </h2>

            <p className="text-text-muted mx-auto mb-12 max-w-2xl text-lg md:text-xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:-translate-y-1"
            >
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
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
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg"
                alt="Disponible en Google Play"
                width={180}
                height={56}
                className="h-14 w-auto"
              />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}