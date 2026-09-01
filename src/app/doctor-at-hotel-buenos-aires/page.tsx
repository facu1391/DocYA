import type { Metadata } from "next";
import { BedDouble, FileText, Hotel, Stethoscope } from "lucide-react";
import TouristCareLanding from "@/components/seo/TouristCareLanding";

const PATH = "/doctor-at-hotel-buenos-aires";

export const metadata: Metadata = {
  title: "Doctor at Your Hotel in Buenos Aires | House Call",
  description: "Request a private doctor at your hotel, Airbnb or temporary accommodation in Buenos Aires City. No Argentine health insurance required; subject to availability.",
  keywords: ["doctor at hotel Buenos Aires", "doctor at home Buenos Aires", "hotel doctor Buenos Aires", "house call doctor Buenos Aires"],
  alternates: { canonical: PATH, languages: { en: PATH, "es-AR": "/medico-a-domicilio-caba" } },
  openGraph: { title: "Doctor at Your Hotel in Buenos Aires | DocYa", description: "Private medical house calls for hotels, apartments and temporary accommodation in Buenos Aires City.", url: PATH, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Doctor at Your Hotel in Buenos Aires", description: "Request an in-person house call at your accommodation." },
};

const FAQS = [
  { question: "Can a doctor visit my hotel in Buenos Aires?", answer: "Yes. A hotel, Airbnb or temporary apartment can be used as the visit address when it is within Buenos Aires City coverage. Service depends on professional availability at the time of the request." },
  { question: "Do I need to ask the hotel reception first?", answer: "It is a good idea to tell reception or security that you are expecting a medical professional and confirm the room-access procedure. You should provide a complete address, hotel name and room or apartment details." },
  { question: "How long does a hotel doctor take to arrive?", answer: "Arrival time depends on your neighborhood, traffic, current demand and professional availability. The app shows the request status; no fixed arrival time is guaranteed." },
  { question: "What happens during the house call?", answer: "The physician evaluates you in person, provides medical guidance and decides whether a prescription, certificate, additional testing or emergency referral is appropriate." },
  { question: "What if no house-call doctor is available?", answer: "For a suitable non-emergency issue, you can choose an online consultation instead. If symptoms may be serious, call 911 or 107 (SAME) or go to an emergency department." },
];

export default function DoctorAtHotelPage() {
  return <TouristCareLanding
    path={PATH}
    breadcrumb="Doctor at your hotel"
    badge="Private house calls in Buenos Aires City"
    title="A doctor at your"
    titleHighlight="hotel in Buenos Aires"
    description="Request an in-person medical visit at your hotel, Airbnb or temporary apartment in Buenos Aires City, without local health insurance."
    secondaryCta={{ label: "Prefer an online doctor?", href: "/english-speaking-doctor-buenos-aires", description: "Video care in English" }}
    contentHeading="Medical care without leaving your accommodation"
    paragraphs={["A hotel room or short-term rental can be used as the address for a private medical house call in Buenos Aires City. Enter the full address and access details so the assigned professional can reach you without delays.", "House calls are subject to location and professional availability. If an in-person visit is unavailable or your concern can be safely assessed by video, an online consultation may be a faster alternative. For emergencies, contact local emergency services instead of waiting for either option."]}
    benefitsHeading="What to expect from a hotel house call"
    benefits={[
      { icon: <Hotel size={22}/>, title: "Hotel, Airbnb or apartment", description: "Use your temporary accommodation as the visit address within Buenos Aires City." },
      { icon: <Stethoscope size={22}/>, title: "In-person evaluation", description: "A licensed physician assesses your symptoms and determines the appropriate next step." },
      { icon: <FileText size={22}/>, title: "Documents when appropriate", description: "The doctor may issue a prescription or medical certificate when clinically justified." },
      { icon: <BedDouble size={22}/>, title: "Stay at your accommodation", description: "Avoid navigating an unfamiliar city while feeling unwell." },
    ]}
    faqs={FAQS}
    links={[
      { label: "Doctor in Buenos Aires", href: "/doctor-in-buenos-aires", description: "Overview of in-person and online options" },
      { label: "Medical help in English", href: "/english-speaking-doctor-buenos-aires", description: "English flow and translated video care" },
      { label: "Online doctor for tourists", href: "/medical-care-tourists-argentina", description: "Video consultations anywhere in Argentina" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Información completa en español" },
    ]}
    finalHeading="Need a doctor at your accommodation?"
    finalSubtitle="Enter your Buenos Aires City address and check current house-call availability."
    serviceName="Doctor at hotel in Buenos Aires"
    alternateNames={["Doctor at home Buenos Aires", "Hotel doctor Buenos Aires", "House call doctor Buenos Aires"]}
    serviceDescription="Private doctor house calls at hotels, Airbnbs and temporary apartments in Buenos Aires City."
  />;
}
