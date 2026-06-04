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
import { Particles } from "@/components/ui/Particles";

export default function HomePage() {
  return (
    <main className="relative bg-[#09090B]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles quantity={250} staticity={30} color="#3B82F6" />
      </div>
      <div className="relative z-10">
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
      </div>
    </main>
  );
}
