"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardPlus, FileCheck2, FileHeart, FolderHeart, MapPin, ShieldCheck, Stethoscope, Video, WalletCards } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import PreciosSection from "./PreciosSection";
import { useI18n } from "@/lib/i18n/context";
import styles from "./home-conversion.module.css";

export default function HomeConversion() {
  const { locale } = useI18n();
  const en = locale === "en";
  const documents = [
    { icon: FileHeart, title: en ? "Electronic prescriptions" : "Recetas electrónicas", href: "/receta-medica-online" },
    { icon: FileCheck2, title: en ? "Medical certificates" : "Certificados médicos", href: "/certificado-medico-online" },
    { icon: ClipboardPlus, title: en ? "Medical test orders" : "Órdenes de estudios", href: "/orden-medica-online" },
  ];
  const steps = [
    { title: en ? "Choose your type of care." : "Elegí cómo querés atenderte.", copy: en ? "Choose a home visit or a teleconsultation." : "Seleccioná médico a domicilio o teleconsulta.", image: "/how/solicitar-portrait.png", alt: en ? "DocYa patient app" : "Aplicación DocYa Paciente" },
    { title: en ? "DocYa looks for a professional." : "DocYa busca un profesional.", copy: en ? "We connect your request with available registered doctors." : "Nuestro sistema conecta tu solicitud con médicos matriculados disponibles.", image: "/how/experiencia3.png", alt: en ? "Doctor receives a care request" : "El profesional recibe la solicitud de atención" },
    { title: en ? "Receive care." : "Recibí atención.", copy: en ? "At home or by video call. Track the doctor’s arrival in the app for home visits." : "Atendete desde tu casa o por videollamada. Si solicitaste domicilio, seguí la llegada del profesional desde la app.", image: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1776468713/Captura_de_pantalla_2026-04-09_144113-portrait_vagywd.png", alt: en ? "Doctor arrival tracking in DocYa" : "Seguimiento del médico en camino desde DocYa" },
  ];
  const trust = [
    { icon: ShieldCheck, title: en ? "Registered professionals" : "Profesionales matriculados", text: en ? "Medical care provided by a real professional." : "Atención médica real a cargo de un profesional." },
    { icon: MapPin, title: en ? "Care you can follow" : "Seguimiento de consultas", text: en ? "Check your request and track a home visit in the app." : "Consultá tu solicitud y seguí al médico en camino desde la app." },
    { icon: WalletCards, title: en ? "Secure payments" : "Pagos seguros", text: en ? "See your payment options and final amount before confirming." : "Revisá las opciones de pago y el importe final antes de confirmar." },
    { icon: FolderHeart, title: en ? "Digital medical records" : "Historia clínica digital", text: en ? "Your consultations and medical documents in your account." : "Tus consultas y documentos médicos organizados en tu cuenta." },
  ];
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
    <section id="consulta" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.intro}><h2>{en ? "Much more than a medical consultation." : "Mucho más que una consulta médica."}</h2><p>{en ? "Receive professional care and, when appropriate, the medical documents you need." : "Recibí atención profesional y, cuando corresponda, obtené la documentación médica que necesitás."}</p></ScrollReveal>
        <div className={styles.documents}>{documents.map(({ icon: Icon, title, href }) => <article key={href}><Icon size={26} aria-hidden /><h3>{title}</h3><Link href="/pedir?tipo=teleconsulta">{en ? "Request a consultation" : "Solicitar una consulta"}</Link><Link className={styles.guide} href={href}>{en ? "How it works" : "Cómo funciona"}</Link></article>)}</div>
        <p className={styles.small}>{en ? "Medical documents depend on the doctor’s assessment and professional judgment. They are not issued automatically." : "La documentación depende de la evaluación y el criterio del profesional médico. No se emite automáticamente."}</p>
      </div>
    </section>
    <section id="como-funciona" className={`${styles.section} ${styles.soft}`}>
      <div className={styles.container}><ScrollReveal className={styles.intro}><h2>{en ? "Requesting care has never been so simple." : "Pedir atención médica nunca fue tan simple."}</h2></ScrollReveal><div className={styles.steps}>{steps.map((step, i) => <article key={step.title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{step.title}</h3><p>{step.copy}</p><div className={styles.stepImage}><Image src={step.image} alt={step.alt} width={220} height={450} sizes="(max-width: 760px) 110px, 180px" /></div></article>)}</div></div>
    </section>
    <PreciosSection />
    <section id="cobertura" className={`${styles.section} ${styles.soft}`}>
      <div className={styles.container}><div className={styles.intro}><h2>{en ? "Care from real professionals." : "Atención real, con profesionales de salud."}</h2><p>{en ? "Home visits in CABA and video consultations across Argentina, subject to professional and location availability." : "Médico a domicilio en CABA y teleconsulta en Argentina, según zona y disponibilidad de profesionales."}</p></div><div className={styles.trust}>{trust.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} aria-hidden /><h3>{title}</h3><p>{text}</p></article>)}</div><div className={styles.contextLinks}><Link href="/medico-a-domicilio-caba">{en ? "Home care in CABA" : "Atención a domicilio en CABA"}</Link><Link href="/medico-online">{en ? "Online doctor" : "Cómo funciona el médico online"}</Link><Link href="/medico-a-domicilio-particular">{en ? "Private medical care" : "Atención particular sin obra social"}</Link></div></div>
    </section>
    <section id="preguntas" className={styles.section}>
      <div className={styles.narrow}><div className={styles.intro}><h2>{en ? "Answers before you request care." : "Tus dudas, antes de pedir atención."}</h2></div><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div><div className={styles.contextLinks}><Link href="/centro-de-ayuda">{en ? "Help centre" : "Centro de ayuda"}</Link><Link href="/teleconsulta">{en ? "About teleconsultations" : "Más sobre teleconsulta"}</Link><Link href="/doctor-in-buenos-aires">{en ? "Care for tourists in Buenos Aires" : "Atención para turistas en Buenos Aires"}</Link><Link href="/medical-care-tourists-argentina">{en ? "Medical care for tourists in Argentina" : "Consultas para turistas en Argentina"}</Link></div></div>
    </section>
    <section id="descargar" className={`${styles.section} ${styles.soft}`}>
      <div className={styles.narrow}><div className={styles.intro}><h2>{en ? "Choose how you want to receive care." : "Elegí cómo querés atenderte."}</h2><p>{en ? "Request care on the web or from the DocYa app." : "Solicitá atención desde la web o desde la app de DocYa."}</p></div><div className={`${styles.actions} ${styles.center}`}><Link className={styles.homeButton} href="/pedir"><Stethoscope size={20} aria-hidden />{en ? "Doctor at home" : "Médico a domicilio"}</Link><Link className={styles.videoButton} href="/pedir?tipo=teleconsulta"><Video size={20} aria-hidden />{en ? "Teleconsultation" : "Teleconsulta"}</Link></div><div className={styles.downloads}><a href="https://apps.apple.com/ar/app/docya/id6753604975" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg" alt="App Store" width={150} height={45} /></a><a href="https://play.google.com/store/apps/details?id=com.docya.paciente" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg" alt="Google Play" width={150} height={45} /></a></div><p className={styles.small}>{en ? "For emergencies, contact local emergency services." : "Ante una emergencia, llamá al 107 o al 911, o acudí a una guardia."}</p></div>
    </section>
  </div>;
}
