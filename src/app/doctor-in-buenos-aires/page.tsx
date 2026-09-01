import type { Metadata } from "next";
import { Building2, Languages, MapPin, Video } from "lucide-react";
import TouristCareLanding from "@/components/seo/TouristCareLanding";

const PATH = "/doctor-in-buenos-aires";

export const metadata: Metadata = {
  title: "Doctor in Buenos Aires for Tourists | Medical Care",
  description: "Need a doctor in Buenos Aires? Request a private doctor at your hotel or an online medical consultation. For tourists and visitors without Argentine health insurance.",
  keywords: ["doctor in Buenos Aires", "medical assistance Buenos Aires", "doctor for tourists Buenos Aires", "tourist doctor Argentina"],
  alternates: { canonical: PATH, languages: { en: PATH, "es-AR": "/teleconsulta-turistas" } },
  openGraph: { title: "Doctor in Buenos Aires for Tourists | DocYa", description: "House calls and online medical consultations for visitors in Buenos Aires.", url: PATH, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Doctor in Buenos Aires for Tourists | DocYa", description: "Request medical care from your hotel or accommodation." },
};

const FAQS = [
  { question: "How can a tourist see a doctor in Buenos Aires?", answer: "Use DocYa to request either a private house call at your address in Buenos Aires City or an online consultation by video. Availability and estimated arrival are shown during the request process." },
  { question: "Do I need Argentine health insurance or a local ID?", answer: "No Argentine health plan is required. Consultations are private and paid through the available options shown during checkout." },
  { question: "Should I choose a hotel visit or an online doctor?", answer: "Choose a house call when a physical examination may be useful and you are within the home-visit coverage area. Choose telemedicine for non-emergency issues that can be assessed by video or when you are outside Buenos Aires City." },
  { question: "Can the doctor issue a prescription or medical certificate?", answer: "If clinically appropriate after the assessment, the doctor may issue a digitally signed prescription or medical certificate. Issuance is always a medical decision." },
  { question: "Is DocYa an emergency or ambulance service?", answer: "No. For potentially serious or life-threatening symptoms, call 911 or 107 (SAME), or go to an emergency department." },
];

export default function DoctorInBuenosAiresPage() {
  return <TouristCareLanding
    path={PATH}
    breadcrumb="Doctor in Buenos Aires"
    badge="Medical care for tourists in Buenos Aires"
    title="Need a doctor in"
    titleHighlight="Buenos Aires?"
    description="Request a licensed physician from your hotel, apartment or phone. Choose an in-person house call in Buenos Aires City or a video consultation from anywhere in Argentina."
    secondaryCta={{ label: "Compare care options", href: "/doctor-at-hotel-buenos-aires", description: "Hotel and house calls" }}
    contentHeading="Medical assistance without navigating an unfamiliar healthcare system"
    paragraphs={["Getting sick abroad can turn a simple medical question into hours of searching. DocYa gives visitors one clear starting point: request a private doctor at your accommodation in Buenos Aires City or speak with a doctor online by video.", "House calls are useful when an in-person examination may be needed. Telemedicine is available throughout Argentina for suitable non-emergency concerns. In both cases, the physician decides whether a prescription, certificate or referral to in-person care is appropriate."]}
    benefitsHeading="Choose the type of care that fits your trip"
    benefits={[
      { icon: <Building2 size={22}/>, title: "Hotel or apartment visit", description: "Request a private house call at an address within Buenos Aires City, subject to professional availability." },
      { icon: <Video size={22}/>, title: "Online doctor", description: "Use a video consultation from Buenos Aires or any other destination in Argentina." },
      { icon: <Languages size={22}/>, title: "English-friendly journey", description: "The patient flow is available in English, with optional AI translation for eligible video consultations when available." },
      { icon: <MapPin size={22}/>, title: "Local or nationwide", description: "House calls cover Buenos Aires City; telemedicine extends across Argentina." },
    ]}
    faqs={FAQS}
    links={[
      { label: "Medical care in English", href: "/english-speaking-doctor-buenos-aires", description: "English patient flow and real-time AI translation" },
      { label: "Doctor at your hotel", href: "/doctor-at-hotel-buenos-aires", description: "Private house calls in Buenos Aires City" },
      { label: "Online doctor for tourists in Argentina", href: "/medical-care-tourists-argentina", description: "Video consultations throughout the country" },
      { label: "Versión en español", href: "/teleconsulta-turistas", description: "Atención médica para turistas" },
    ]}
    finalHeading="Need medical assistance in Buenos Aires?"
    finalSubtitle="Start your request and choose a house call or video consultation based on your location and symptoms."
    serviceName="Doctor in Buenos Aires for tourists"
    alternateNames={["Medical assistance Buenos Aires", "Doctor for tourists Buenos Aires", "Private doctor Buenos Aires"]}
    serviceDescription="Private house calls and online medical consultations for tourists and international visitors in Buenos Aires."
  />;
}
