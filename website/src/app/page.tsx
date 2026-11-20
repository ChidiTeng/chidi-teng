import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { homeFaq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ServicesBento />
      <CaseStudies />
      <About />
      <Process />
      <Faq items={homeFaq} />
      <CtaBand />
    </>
  );
}
