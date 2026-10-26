"use client";

import Image from "next/image";
import { Files, MapPinned } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { usePedirTheme } from "./theme";
import styles from "./PatientAppCard.module.css";

const STORES = [
  {
    name: "App Store",
    url: "https://apps.apple.com/ar/app/docya/id6753604975",
    badge: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg",
    width: 135,
  },
  {
    name: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.docya.paciente",
    badge: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg",
    width: 151,
  },
];

export default function PatientAppCard({
  variant,
  nursing = false,
}: {
  variant: "tracking" | "completed";
  nursing?: boolean;
}) {
  const { locale } = useI18n();
  const { text, muted, cardBg, brandBorder, dark } = usePedirTheme();
  const tracking = variant === "tracking";
  const copy = locale === "es" ? {
    label: "DOCYA EN TU CELULAR",
    title: tracking
      ? `Seguí la llegada de tu ${nursing ? "profesional" : "médico"} en el mapa`
      : "Tené DocYa a mano para tu próxima consulta",
    description: tracking
      ? "Descargá la app y seguí tu consulta desde DocYa."
      : "Accedé a tu historial y a los documentos que haya emitido tu profesional, y solicitá atención cuando la necesites.",
    account: "Ingresá con la misma cuenta de DocYa.",
    download: "Descargar DocYa en",
  } : {
    label: "DOCYA ON YOUR PHONE",
    title: tracking
      ? `Follow your ${nursing ? "professional" : "doctor"} on the map`
      : "Keep DocYa handy for your next consultation",
    description: tracking
      ? "Download the app and follow your consultation on DocYa."
      : "Access your history and any documents issued by your professional, and request care whenever you need it.",
    account: "Sign in with the same DocYa account.",
    download: "Download DocYa on",
  };
  const Icon = tracking ? MapPinned : Files;

  return (
    <section
      className={styles.card}
      aria-label={copy.title}
      style={{ background: cardBg, borderColor: brandBorder, color: text }}
    >
      <div className={styles.heading}>
        <span className={styles.icon} style={{ color: dark ? "#5eead4" : "#0f766e" }}>
          <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div>
          <p className={styles.label} style={{ color: dark ? "#5eead4" : "#0f766e" }}>{copy.label}</p>
          <h2 className={styles.title}>{copy.title}</h2>
        </div>
      </div>
      <p className={styles.description} style={{ color: muted }}>{copy.description}</p>
      <div className={styles.stores}>
        {STORES.map(store => (
          <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${copy.download} ${store.name}`}>
            <Image src={store.badge} alt={store.name} width={store.width} height={44} unoptimized />
          </a>
        ))}
      </div>
      <p className={styles.account} style={{ color: muted }}>{copy.account}</p>
    </section>
  );
}
