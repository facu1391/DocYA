import { FaWhatsapp } from "react-icons/fa";
import styles from "./whatsapp-support.module.css";

export default function WhatsAppSupportButton({ english = false, adsLanding = false }: { english?: boolean; adsLanding?: boolean }) {
  const label = english ? "Contact DocYa on WhatsApp" : "Hablar con DocYa por WhatsApp";
  const message = adsLanding
    ? "Hola, llegué a DocYa desde un anuncio de Google y tengo una duda sobre la teleconsulta."
    : english
    ? "Hi DocYa, I have a question before requesting medical care."
    : "Hola DocYa, tengo una duda antes de solicitar atención médica.";

  return (
    <a className={`${styles.button}${adsLanding ? ` ${styles.allScreens}` : ""}`} href={`https://wa.me/5491168700607?text=${encodeURIComponent(message)}`}
      target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <FaWhatsapp size={31} aria-hidden="true" />
    </a>
  );
}
