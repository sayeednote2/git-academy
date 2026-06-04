import { HeroSection } from "@/components/home/HeroSection";
import { AuthorityStrip } from "@/components/home/AuthorityStrip";
import { WhySection } from "@/components/home/WhySection";
import { CertEcosystem } from "@/components/home/CertEcosystem";
import { LabShowcase } from "@/components/home/LabShowcase";
import { CareerOutcomes } from "@/components/home/CareerOutcomes";
import { TrainerSection } from "@/components/home/TrainerSection";
import { CorporateSection } from "@/components/home/CorporateSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AuthorityStrip />
      <WhySection />
      <CertEcosystem />
      <LabShowcase />
      <CareerOutcomes />
      <TrainerSection />
      <CorporateSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
