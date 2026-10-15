"use client";

import Image from "next/image";
import WhatsAppSupport from "./WhatsAppSupport";
import styles from "./home-conversion.module.css";

/** Public FAQ entry, using the same assistant with server-side frequency limits. */
export default function PublicAISection({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="docya-ia" className={`${styles.section} ${styles.aiSection}`} aria-labelledby="public-ai-heading">
      <div className={`${styles.container} ${styles.aiGrid}`}>
        <div>
          <Image src="/docya-ai-icon.png" alt="DocYa IA" width={64} height={64} className={styles.aiLogo} />
          <h2 id="public-ai-heading">¿No sabés qué tipo de atención necesitás?</h2>
          <p className={styles.aiDescription}>Contanos qué necesitás y DocYa IA te ayuda a elegir entre atención a domicilio o teleconsulta, conocer nuestros servicios y resolver tus dudas.</p>
        </div>
        <div className={styles.aiAccess}>
          <button type="button" className={styles.homeButton} onClick={onOpen} aria-haspopup="dialog">Hablar con DocYa IA</button>
          <p className={styles.small}>Gratis y sin registrarte.</p>
          <WhatsAppSupport />
        </div>
      </div>
    </section>
  );
}
