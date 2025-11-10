import HeroPublic from "@/components/landing-public/HeroPublic";
import PromoVideoPublic from "@/components/landing-public/PromoVideoPublic"; // 👈
import JoinAsPatient from "@/components/landing-public/JoinAsPatient";
import StepsPublic from "@/components/landing-public/StepsPublic";
import BenefitsPublic from "@/components/landing-public/BenefitsPublic";
import ImpactSection from "@/components/landing-public/ImpactSection";
import TrustPublic from "@/components/landing-public/TrustPublic";
import Testimonials from "@/components/landing-public/Testimonials";
import DownloadApp from "@/components/landing-public/DownloadAppPublic";

export default function Home() {
  return (
    <main>
      <HeroPublic />
      <PromoVideoPublic />
      <JoinAsPatient />
      <StepsPublic />
      <BenefitsPublic />
      <ImpactSection /> 
      <TrustPublic />
      <Testimonials />
      <DownloadApp />
    </main>
  );
}
