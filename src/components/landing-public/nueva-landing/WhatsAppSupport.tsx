import { FaWhatsapp } from "react-icons/fa";
import styles from "./home-conversion.module.css";

export default function WhatsAppSupport({ english = false }: { english?: boolean }) {
  const message = english
    ? "Hi DocYa, I have a question before requesting medical care."
    : "Hola DocYa, tengo una duda antes de solicitar atención médica.";

  return (
    <div className={styles.whatsappSupport}>
      <p>{english ? "Questions before requesting care? Talk to our team." : "¿Tenés dudas antes de pedir? Hablá con nuestro equipo."}</p>
      <a href={`https://wa.me/5491168700607?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={21} aria-hidden="true" />
        {english ? "Contact us on WhatsApp" : "Hablar por WhatsApp"}
      </a>
    </div>
  );
}
