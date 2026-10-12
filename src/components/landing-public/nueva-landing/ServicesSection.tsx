import Image from "next/image";
import Link from "next/link";
import homeStyles from "./home-conversion.module.css";
import styles from "./services-section.module.css";

export default function ServicesSection({ en }: { en: boolean }) {
  const documents = [
    { title: en ? "Electronic prescriptions" : "Recetas electrónicas", href: "/receta-medica-online" },
    { title: en ? "Medical certificates" : "Certificados médicos", href: "/certificado-medico-online" },
    { title: en ? "Medical test orders" : "Órdenes de estudios", href: "/orden-medica-online" },
  ];
  return (
    <section id="consulta" className={styles.services} aria-labelledby="services-title">
      <div className={styles.container}>
        <h2 id="services-title" className={styles.heading}>{en ? "The care you need, wherever you are." : "La atención que necesitás, desde donde estés."}</h2>
        <article className={styles.service} aria-labelledby="home-care-title">
          <div className={styles.copy}>
            <h3 id="home-care-title">{en ? "A doctor comes to you." : "Un médico va hasta vos."}</h3>
            <p>{en ? "Request care from your phone. DocYa looks for an available professional near your location, and you can track their arrival in real time." : "Solicitá atención desde tu celular. DocYa busca un profesional disponible cerca de tu ubicación y podés seguir su llegada en tiempo real."}</p>
          </div>
          <div className={styles.phone}>
            <Image src="/inversores/seguimiento.png" alt={en ? "Doctor arrival tracking on the DocYa map" : "Mapa y seguimiento de la llegada del médico en DocYa"} width={1042} height={2048} sizes="(max-width: 760px) 260px, 320px" />
          </div>
          <div className={styles.action}><Link className={homeStyles.homeButton} href="/pedir">{en ? "Request a doctor at home" : "Pedir médico a domicilio"}</Link></div>
        </article>
        <article className={`${styles.service} ${styles.reverse}`} aria-labelledby="video-care-title">
          <div className={styles.copy}>
            <h3 id="video-care-title">{en ? "Get care wherever you are." : "Atendete desde donde estés."}</h3>
            <p>{en ? "Connect by video call with an available doctor, without appointments and from anywhere in Argentina." : "Conectate por videollamada con un médico disponible, sin turnos y desde cualquier lugar de Argentina."}</p>
          </div>
          <div className={styles.phone}>
            <Image src="/how/teleconsulta.webp" alt={en ? "A medical video call in DocYa" : "Videollamada médica de DocYa desde el celular"} width={900} height={1472} sizes="(max-width: 760px) 300px, 380px" />
          </div>
          <div className={styles.action}><Link className={homeStyles.videoButton} href="/pedir?tipo=teleconsulta">{en ? "Request a teleconsultation" : "Pedir teleconsulta"}</Link></div>
        </article>
        <article className={`${styles.service} ${styles.documents}`} aria-labelledby="documents-title">
          <div className={styles.copy}>
            <h3 id="documents-title">{en ? "Your medical documents, always at hand." : "Tus documentos médicos, siempre a mano."}</h3>
            <p>{en ? "Find in DocYa the electronic prescriptions, certificates and medical test orders issued by your professional during your care." : "Consultá desde DocYa las recetas electrónicas, certificados y órdenes de estudios que el profesional haya emitido durante tu atención."}</p>
            <ul className={styles.documentLinks}>{documents.map(({ title, href }) => <li key={href}><Link href={href}>{title}<span aria-hidden="true"> ↗</span></Link></li>)}</ul>
            <p className={styles.disclaimer}>{en ? "Documents are not issued automatically. Issuance depends on the medical assessment and professional judgment." : "No se emiten automáticamente. La emisión depende de la evaluación médica y del criterio profesional."}</p>
          </div>
          <div className={styles.phone}>
            <Image src="/how/documentos-medicos.webp" alt={en ? "My documents in DocYa: prescriptions, certificates and test orders" : "Mis documentos en DocYa: recetas, certificados y órdenes de estudios"} width={900} height={1773} sizes="(max-width: 760px) 260px, 320px" />
          </div>
        </article>
      </div>
    </section>
  );
}
