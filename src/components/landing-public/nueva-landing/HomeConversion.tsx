"use client";

import Image from "next/image";
import Link from "next/link";
import { Stethoscope, Video } from "lucide-react";
import DomicilioVideo from "./DomicilioVideo";
import PreciosSection from "./PreciosSection";
import PublicAIChat from "./PublicAIChat";
import ServicesSection from "./ServicesSection";
import { useI18n } from "@/lib/i18n/context";
import styles from "./home-conversion.module.css";

export default function HomeConversion() {
  const { locale } = useI18n();
  const en = locale === "en";
  const faqs = en ? [
    ["Do I need health insurance?", "No. You can request private medical care and pay per consultation, without a monthly subscription."],
    ["How much does a consultation cost?", "Current daytime and nighttime prices are listed above. The request flow confirms the final amount before payment."],
    ["How does a teleconsultation work?", "Request care and DocYa looks for an available doctor. The consultation takes place by video call on your phone or computer."],
    ["Can I request care for a family member?", "Yes. Choose ‘Another person’ in the request flow and enter the details of the person who needs care."],
    ["Can I get a prescription or certificate?", "The doctor may issue prescriptions, certificates or test orders after assessing you, when appropriate. Issuance is not guaranteed."],
    ["What if no doctor accepts my request?", "If no professional accepts within the search period shown, the request is cancelled and any applicable refund is processed. Check the status in your account or contact support."],
  ] : [
    ["¿Necesito obra social?", "No. Podés solicitar atención médica particular y pagar por consulta, sin obra social, prepaga ni suscripción mensual."],
    ["¿Cuánto cuesta una consulta?", "Arriba podés consultar los precios vigentes de día y de noche. El flujo de solicitud confirma el importe final antes del pago."],
    ["¿Cómo funciona una teleconsulta?", "Solicitás atención y DocYa busca un médico disponible. La consulta se realiza por videollamada desde tu celular o computadora, sin reservar un turno."],
    ["¿Puedo solicitar atención para un familiar?", "Sí. En el flujo de solicitud elegí ‘Otra persona’ y completá los datos de quien necesita atención."],
    ["¿Puedo obtener una receta o certificado?", "El médico puede emitir recetas, certificados u órdenes de estudios después de evaluarte, cuando corresponda y según su criterio profesional. No se garantiza su emisión."],
    ["¿Qué pasa si ningún médico acepta mi solicitud?", "Si ningún profesional acepta dentro del plazo de búsqueda informado, la solicitud se cancela y se gestiona la devolución que corresponda. Podés consultar el estado desde tu cuenta o comunicarte con soporte."],
  ];
  return <div className={styles.content}>
    <section id="como-funciona" className={`${styles.section} ${styles.videoSection}`}>
      <div className={`${styles.container} ${styles.videoGrid}`}>
        <div className={styles.videoCopy}>
          <h2>{en ? "This is how easy DocYa is." : "Así de fácil funciona DocYa."}</h2>
          <p>{en ? "Request care, we look for an available professional, and you can track their arrival on your phone." : "Solicitás atención, buscamos un profesional disponible y podés seguir su llegada desde tu celular."}</p>
          <p className={styles.videoAlternative}>{en ? "Prefer care online? You can also request a teleconsultation by video call." : "¿Preferís atenderte online? También podés pedir una teleconsulta por videollamada."}</p>
          <Link className={styles.inlineLink} href="/pedir">{en ? "Request care" : "Solicitar atención"}<span aria-hidden> →</span></Link>
        </div>
        <div className={styles.processVideo}><DomicilioVideo vertical /><div className={styles.motionPoster}><Image src="/inversores/seguimiento.png" alt={en ? "Doctor arrival tracking" : "Seguimiento de la llegada del médico"} width={1042} height={2048} sizes="240px" /><p>{en ? "Animation paused to respect your reduced motion preference." : "Animación pausada según tu preferencia de movimiento reducido."}</p></div></div>
      </div>
    </section>
    <PublicAIChat />
    <ServicesSection en={en} />
    <PreciosSection />
    <section id="cobertura" className={`${styles.section} ${styles.trustSection}`}>
      <div className={`${styles.container} ${styles.trustGrid}`}>
        <div><h2>{en ? "Real medical care. Clear information." : "Atención médica real. Información clara."}</h2><p>{en ? "Registered professionals, medical registration verified in SISA. Home visits in CABA and teleconsultations across Argentina, subject to availability." : "Profesionales con matrícula verificada en SISA. Domicilio en CABA y teleconsulta en Argentina, según zona y disponibilidad."}</p></div>
        <ul className={styles.trustList}><li>{en ? "Track your requests and the doctor's arrival" : "Seguimiento de solicitudes y llegada del médico"}</li><li>{en ? "Secure payments, final amount before confirmation" : "Pagos seguros, con el importe final antes de confirmar"}</li><li>{en ? "Digital medical records and documents in your account" : "Historia clínica digital y documentos en tu cuenta"}</li></ul>
      </div><div className={styles.contextLinks}><Link href="/medico-a-domicilio-caba">{en ? "Home care in CABA" : "Atención a domicilio en CABA"}</Link><Link href="/medico-online">{en ? "Online doctor" : "Cómo funciona el médico online"}</Link><Link href="/medico-a-domicilio-particular">{en ? "Private medical care" : "Atención particular sin obra social"}</Link></div>
    </section>
    <section id="preguntas" className={styles.section}>
      <div className={styles.narrow}><div className={styles.intro}><h2>{en ? "Answers before you request care." : "Tus dudas, antes de pedir atención."}</h2></div><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div><div className={styles.contextLinks}><Link href="/centro-de-ayuda">{en ? "Help centre" : "Centro de ayuda"}</Link><Link href="/teleconsulta">{en ? "About teleconsultations" : "Más sobre teleconsulta"}</Link><Link href="/doctor-in-buenos-aires">{en ? "Care for tourists in Buenos Aires" : "Atención para turistas en Buenos Aires"}</Link><Link href="/medical-care-tourists-argentina">{en ? "Medical care for tourists in Argentina" : "Consultas para turistas en Argentina"}</Link></div></div>
    </section>
    <section id="descargar" className={`${styles.section} ${styles.closing}`}>
      <div className={styles.narrow}><div className={styles.intro}><h2>{en ? "Your doctor, a tap away." : "Tu médico, a un toque de distancia."}</h2><p>{en ? "Choose how you want to receive care and DocYa looks for an available professional." : "Elegí cómo querés atenderte y DocYa busca un profesional disponible para vos."}</p></div><div className={`${styles.actions} ${styles.center}`}><Link className={styles.homeButton} href="/pedir"><Stethoscope size={20} aria-hidden />{en ? "Request a doctor at home" : "Pedir médico a domicilio"}</Link><Link className={styles.videoButton} href="/pedir?tipo=teleconsulta"><Video size={20} aria-hidden />{en ? "Request a teleconsultation" : "Pedir teleconsulta"}</Link></div><div className={styles.downloads}><a href="https://apps.apple.com/ar/app/docya/id6753604975" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg" alt="App Store" width={150} height={45} /></a><a href="https://play.google.com/store/apps/details?id=com.docya.paciente" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg" alt="Google Play" width={150} height={45} /></a></div><p className={styles.small}>{en ? "For emergencies, contact local emergency services." : "Ante una emergencia, llamá al 107 o al 911, o acudí a una guardia."}</p></div>
    </section>
  </div>;
}
