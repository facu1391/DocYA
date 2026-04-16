// src/components/landing-public/DownloadAppPublic.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

const APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

const PLAY_STORE_BADGE =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg";

const APP_STORE_BADGE =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg";

export default function DownloadAppPublic() {
  return (
    <section
      id="descargar"
      className="mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-[color-mix(in_srgb,var(--brand)_14%,transparent)] bg-[linear-gradient(180deg,#062426_0%,#04181a_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto max-w-4xl text-center">
        <span className="badge border-white/15 bg-white/10 text-white">
          Descargá DocYa
        </span>

        <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
          Llevá tu salud al próximo nivel
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 md:text-base">
          Descargá DocYa y accedé a profesionales verificados en minutos, sin esperas.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar DocYa en Google Play"
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src={PLAY_STORE_BADGE}
              alt="Disponible en Google Play"
              width={210}
              height={62}
              className="h-auto w-[190px] md:w-[210px]"
              unoptimized
            />
          </Link>

          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Descargar DocYa en App Store"
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src={APP_STORE_BADGE}
              alt="Descargar en App Store"
              width={188}
              height={62}
              className="h-auto w-[170px] md:w-[188px]"
              unoptimized
            />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="badge border-white/15 bg-white/10 text-white">
            Profesionales verificados
          </span>
          <span className="badge border-white/15 bg-white/10 text-white">
            Atención en &lt; 35 min
          </span>
          <span className="badge border-white/15 bg-white/10 text-white">
            Pagos seguros
          </span>
        </div>
      </div>
    </section>
  );
}