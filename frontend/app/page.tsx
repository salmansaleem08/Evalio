import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Mission } from "@/components/landing/mission";
import { Plans } from "@/components/landing/plans";
import { SiteHeader } from "@/components/landing/site-header";
import { Waitlist } from "@/components/landing/waitlist";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Mission />
      <HowItWorks />
      <Plans />
      <Waitlist />
      <CtaSection />
      <Footer />
    </>
  );
}
