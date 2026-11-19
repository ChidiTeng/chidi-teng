import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { homeFaq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicesBento />
      <Process />
      <CaseStudies />
      <Faq items={homeFaq} />
      <CtaBand />
    </>
  );
}
