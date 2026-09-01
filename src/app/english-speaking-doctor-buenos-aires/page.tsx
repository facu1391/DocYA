import type { Metadata } from "next";
import { BadgeCheck, Languages, Smartphone, Video } from "lucide-react";
import TouristCareLanding from "@/components/seo/TouristCareLanding";

const PATH = "/english-speaking-doctor-buenos-aires";

export const metadata: Metadata = {
  title: "Medical Care in English in Buenos Aires | AI Translation",
  description: "Medical help in English while visiting Buenos Aires. Use an English patient flow and request an online consultation with optional AI translation when available.",
  keywords: ["English speaking doctor Buenos Aires", "English doctor Buenos Aires", "medical help in English Buenos Aires", "online doctor Buenos Aires English"],
  alternates: { canonical: PATH, languages: { en: PATH, "es-AR": "/teleconsulta-turistas" } },
  openGraph: { title: "Medical Care in English in Buenos Aires | DocYa", description: "English patient journey and optional real-time AI translation for eligible video consultations.", url: PATH, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Medical Care in English in Buenos Aires", description: "Online medical care with optional real-time AI translation." },
};

const FAQS = [
  { question: "Can I request medical care in English?", answer: "Yes. DocYa's patient journey is available in English. For eligible video consultations, optional real-time AI translation between English and Spanish may be offered during checkout, subject to availability." },
  { question: "Does every DocYa physician speak English?", answer: "No. We do not promise that every available physician is bilingual. The platform may offer real-time translation for eligible teleconsultations so language support does not depend solely on the assigned physician." },
  { question: "How does translation work during the video consultation?", answer: "When available and selected before payment, the consultation interface provides translated speech support during the video call. The option and any additional fee are displayed before confirming the request." },
  { question: "Can foreign visitors receive a prescription in Argentina?", answer: "If the physician considers it clinically appropriate, they may issue a digital prescription after the consultation. A pharmacy makes the final dispensing decision under Argentine rules." },
  { question: "What if my symptoms are severe?", answer: "Do not wait for a video consultation. Call 911 or 107 (SAME), ask your hotel for emergency assistance, or go to the nearest emergency department." },
];

export default function EnglishSpeakingDoctorPage() {
  return <TouristCareLanding
    path={PATH}
    breadcrumb="Medical care in English"
    badge="Medical assistance in English"
    title="Medical help in English in"
    titleHighlight="Buenos Aires"
    description="Use DocYa in English and request a video consultation with a licensed Argentine physician. Optional real-time AI translation may be available during checkout."
    secondaryCta={{ label: "All tourist care options", href: "/doctor-in-buenos-aires", description: "House call or online care" }}
    contentHeading="Clear communication when you need a doctor abroad"
    paragraphs={["Searching for an English-speaking doctor in Buenos Aires often means calling multiple clinics and trying to explain symptoms through a front desk. DocYa offers an English patient flow and online access to licensed Argentine physicians.", "DocYa does not claim that every physician is bilingual. For eligible teleconsultations, you can select optional AI translation when it is available. The option, supported language and any fee are shown before payment, keeping the promise accurate and transparent."]}
    benefitsHeading="Designed for international visitors"
    benefits={[
      { icon: <Smartphone size={22}/>, title: "English patient flow", description: "Navigate the request process and consultation details in English." },
      { icon: <Languages size={22}/>, title: "Optional translation", description: "Eligible video consultations may include real-time English–Spanish AI translation." },
      { icon: <Video size={22}/>, title: "From your accommodation", description: "Speak with a physician by video without finding an unfamiliar clinic." },
      { icon: <BadgeCheck size={22}/>, title: "Licensed physicians", description: "Consultations are provided by verified professionals licensed to practice in Argentina." },
    ]}
    faqs={FAQS}
    links={[
      { label: "Doctor in Buenos Aires", href: "/doctor-in-buenos-aires", description: "Compare in-person and online care" },
      { label: "Doctor at your hotel", href: "/doctor-at-hotel-buenos-aires", description: "Private house calls in Buenos Aires City" },
      { label: "Online doctor across Argentina", href: "/medical-care-tourists-argentina", description: "Medical care for the rest of your trip" },
      { label: "Contact DocYa", href: "/contacto", description: "Ask a non-urgent question" },
    ]}
    finalHeading="Need medical help in English?"
    finalSubtitle="Start in English and check whether translated video care is available for your consultation."
    serviceName="English-supported online medical care in Buenos Aires"
    alternateNames={["Medical help in English Buenos Aires", "AI-translated medical consultation Buenos Aires", "Online doctor for international visitors"]}
    serviceDescription="English patient journey and optional real-time translation for online medical consultations in Buenos Aires."
  />;
}
