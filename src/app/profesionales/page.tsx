import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, ClipboardPlus, FileCheck2, Pill, Stethoscope } from "lucide-react";
import ProIncomeSimulator from "@/components/landing/ProIncomeSimulator";
import ProfessionalPhoneMockup from "@/components/professionals/ProfessionalPhoneMockup";
import { professionalScreenshots as screenshots } from "@/components/professionals/screenshots";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import styles from "@/components/professionals/professionals.module.css";

export const metadata = {
  title: "Profesionales",
  description: "Sumate como médico o enfermero. Elegí horarios y zonas. Ingresos semanales.",
  alternates: { canonical: "/profesionales" },
  openGraph: { title: "Profesionales", description: "Elegí horarios y zonas. Ingresos semanales.", url: "/profesionales" },
};
const registration = "/registro";
const steps = [
  { title: "Registrate", text: "Completá tu perfil profesional. Validamos tu matrícula y la documentación necesaria para habilitarte.", screenshot: screenshots.professionalProfile },
  { title: "Ponete disponible", text: "Elegí cuándo trabajar y recibí solicitudes de atención según tu modalidad y zona habilitada.", screenshot: screenshots.professionalAvailability },
  { title: "Atendé y cobrá", text: "Aceptá consultas, atendé a tus pacientes y recibí los pagos de tus honorarios los lunes.", screenshot: screenshots.professionalConsultation },
];
const clinicalTools = [
  { label: "Historia clínica digital", Icon: ClipboardList },
  { label: "Recetas electrónicas", Icon: Pill },
  { label: "Certificados médicos", Icon: FileCheck2 },
  { label: "Órdenes de estudios", Icon: ClipboardPlus },
  { label: "Gestión de consultas", Icon: Stethoscope },
];
const faqs = [
  ["¿Tiene costo registrarme?", "Registrarte en DocYa Pro es gratis. Los honorarios y las condiciones de cada atención se informan antes de aceptar una consulta."],
  ["¿Puedo elegir mis horarios?", "Sí. Gestionás tu disponibilidad desde DocYa Pro, según las modalidades habilitadas."],
  ["¿Cómo recibo los pagos?", "Los honorarios de las consultas realizadas se acumulan durante la semana y se transfieren cada lunes. En DocYa Pro podés consultar tus liquidaciones y sus detalles."],
  ["¿Tengo garantizada una cantidad de pacientes?", "No. Las solicitudes dependen de la demanda, tu disponibilidad y el sistema de asignación."],
  ["¿Puedo realizar teleconsultas desde cualquier provincia?", "Depende de tu matrícula, habilitación profesional y la normativa aplicable. El registro no habilita automáticamente la atención en todas las jurisdicciones."],
];
function RegisterButton() {
  return <Link href={registration} className={styles.primary}>Registrarme en DocYa Pro <ArrowRight size={17} aria-hidden="true" /></Link>;
}
function StoreBadges() {
  return <div className={styles.stores}>
    <a href="https://apps.apple.com/ar/app/docyapro/id6753040185" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg" alt="Descargar DocYa Pro en App Store" width={144} height={48} /></a>
    <a href="https://play.google.com/store/apps/details?id=com.docya.pro" target="_blank" rel="noopener noreferrer"><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg" alt="Descargar DocYa Pro en Google Play" width={162} height={48} /></a>
  </div>;
}
export default function Page() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="professional-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div><p className={styles.eyebrow}>DOCYA PRO · MÉDICOS Y ENFERMEROS</p><h1 id="professional-title">Atendé con libertad.<br /><span>Generá ingresos con DocYa.</span></h1><p className={styles.lead}>Recibí solicitudes de teleconsulta y atención médica a domicilio. Elegí cuándo estar disponible y cobrá semanalmente por las consultas realizadas.</p><div className={styles.actions}><RegisterButton /><a className={styles.secondary} href="#comofunciona">Conocer cómo funciona</a></div><p className={styles.note}>Según tu profesión, habilitación y modalidades disponibles.</p><StoreBadges /></div>
        <div className={styles.heroVisual}><ProfessionalPhoneMockup {...screenshots.heroProfessional} priority /></div>
      </div>
    </section>
    <section id="comofunciona" className={`${styles.section} ${styles.light}`} aria-labelledby="how-title">
      <div className={styles.container}><div className={styles.intro}><p className={styles.eyebrow}>ASÍ FUNCIONA DOCYA PRO</p><h2 id="how-title">Vos elegís cuándo atender.<br />DocYa conecta.</h2><p>Organizá tu disponibilidad y recibí solicitudes de pacientes directamente desde DocYa Pro.</p></div><div className={styles.steps}>{steps.map((step, index) => <ScrollReveal key={step.title} y={16} delay={index * .06}><article><div className={styles.stepTitle}><span>0{index + 1}</span><h3>{step.title}</h3></div><p>{step.text}</p><div className={styles.stepPhone}><ProfessionalPhoneMockup {...step.screenshot} /></div></article></ScrollReveal>)}</div></div>
    </section>
    <section id="ingresos" className={styles.section} aria-labelledby="income-title"><div className={styles.container}><div className={styles.intro}><p className={styles.eyebrow}>HONORARIOS REALES. ESTIMACIONES CLARAS.</p><h2 id="income-title">Simulá tus ingresos con DocYa.</h2><p>Descubrí cuánto podrías generar según las consultas que realices y tu disponibilidad.</p></div><ProIncomeSimulator /></div></section>
    <section className={`${styles.section} ${styles.payments}`} aria-labelledby="payments-title"><div className={`${styles.container} ${styles.split}`}><div><p className={styles.eyebrow}>HONORARIOS Y PAGOS</p><h2 id="payments-title">Vos atendés.<br />DocYa se ocupa del resto.</h2><p className={styles.description}>Tus honorarios se acumulan con las consultas realizadas durante la semana y recibís el pago los lunes. Podés consultar cada liquidación en DocYa Pro.</p></div><ul className={styles.featureList}><li>Honorarios transparentes.</li><li>Libertad para elegir disponibilidad.</li><li>Gestión digital de las solicitudes.</li><li>Pagos todos los lunes.</li></ul></div></section>
    <section className={`${styles.section} ${styles.light}`} aria-labelledby="tools-title"><div className={`${styles.container} ${styles.split}`}><div><p className={styles.eyebrow}>TU CONSULTORIO DIGITAL</p><h2 id="tools-title">Tu práctica médica,<br />más simple.</h2><p className={styles.description}>DocYa Pro reúne las herramientas que necesitás para gestionar tus consultas y la documentación clínica desde un solo lugar.</p><ul className={styles.tools}>{clinicalTools.map(({ label, Icon }) => <li key={label}><Icon size={18} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span></li>)}</ul><p className={styles.note}>Las herramientas clínicas dependen de tu habilitación profesional. La emisión de documentación corresponde a la evaluación y al criterio médico.</p></div><div className={styles.toolsPhone}><ProfessionalPhoneMockup {...screenshots.professionalClinicalTools} /></div></div></section>
    <section className={styles.section} aria-labelledby="professions-title"><div className={styles.container}><div className={styles.intro}><p className={styles.eyebrow}>UNA RED DE PROFESIONALES</p><h2 id="professions-title">Tu profesión tiene lugar en DocYa.</h2></div><div className={styles.professions}><article><h3>Médicos</h3><p>Recibí solicitudes de teleconsulta y atención domiciliaria según tu habilitación profesional y las zonas disponibles.</p><Link href={registration}>Registrarme como médico <ArrowRight size={16} aria-hidden="true" /></Link></article><article><h3>Enfermeros</h3><p>Ofrecé servicios de enfermería a domicilio según tu habilitación y las prestaciones disponibles en la plataforma.</p><Link href={registration}>Registrarme como enfermero <ArrowRight size={16} aria-hidden="true" /></Link></article></div></div></section>
    <section className={`${styles.section} ${styles.requirements}`} aria-labelledby="requirements-title"><div className={`${styles.container} ${styles.split}`}><div><p className={styles.eyebrow}>REQUISITOS PARA INCORPORARTE</p><h2 id="requirements-title">Registrarte es simple.</h2><p className={styles.description}>Completá tu perfil. Nuestro equipo verifica la información antes de habilitarte para atender.</p></div><div><ul className={styles.featureList}><li>Matrícula profesional vigente.</li><li>Documentación e identidad verificables.</li><li>Habilitación correspondiente a tu profesión y jurisdicción.</li><li>Registro en DocYa Pro.</li></ul><p className={styles.note}>La validación incluye SISA/REFEPS cuando corresponde. La aprobación no es inmediata ni automática.</p></div></div></section>
    <section className={styles.section} aria-labelledby="faq-title"><div className={styles.narrow}><p className={styles.eyebrow}>ANTES DE SUMARTE</p><h2 id="faq-title">Tus dudas, resueltas.</h2><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section id="registro" className={`${styles.section} ${styles.closing}`} aria-labelledby="join-title"><div className={styles.narrow}><p className={styles.eyebrow}>LIBERTAD. HONORARIOS TRANSPARENTES. HERRAMIENTAS DIGITALES.</p><h2 id="join-title">Tu próxima consulta<br /><span>puede llegar por DocYa.</span></h2><p className={styles.description}>Sumate a una plataforma que conecta profesionales de salud con pacientes que necesitan atención.</p><RegisterButton /><StoreBadges /></div></section>
  </div>;
}
