import { FaWhatsapp } from "react-icons/fa";
import styles from "./whatsapp-support.module.css";

export default function WhatsAppSupportButton({ english = false }: { english?: boolean }) {
  const label = english ? "Contact DocYa on WhatsApp" : "Hablar con DocYa por WhatsApp";
  const message = english
    ? "Hi DocYa, I have a question before requesting medical care."
    : "Hola DocYa, tengo una duda antes de solicitar atención médica.";

  return (
    <a className={styles.button} href={`https://wa.me/5491168700607?text=${encodeURIComponent(message)}`}
      target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <FaWhatsapp size={31} aria-hidden="true" />
    </a>
  );
}
