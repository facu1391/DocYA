import Image from "next/image";
import styles from "./professionals.module.css";

export default function ProfessionalPhoneMockup({ src, alt, priority = false }: { src?: string; alt: string; priority?: boolean }) {
  return <div className={`${styles.phone} ${src ? styles.phoneWithImage : ""}`} aria-hidden={src ? undefined : true}>
    <div className={styles.screen}>
      {src && <Image src={src} alt={alt} fill sizes="(max-width: 760px) 230px, 280px" priority={priority} />}
    </div>
    {!src && <span className={styles.camera} aria-hidden="true" />}
  </div>;
}
