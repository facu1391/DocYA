import HeroPublic from "@/components/landing-public/HeroPublic";
import StepsPublic from "@/components/landing-public/StepsPublic";
import BenefitsPublic from "@/components/landing-public/BenefitsPublic";
import TrustPublic from "@/components/landing-public/TrustPublic";
import Testimonials from "@/components/landing-public/Testimonials";
import DownloadApp from "@/components/landing-public/DownloadApp";

export default function Home() {
  return (
    <main>
       <HeroPublic />
      <StepsPublic />
      <BenefitsPublic />
      <TrustPublic />
      <Testimonials />
      <DownloadApp />
    </main>
  );
}
