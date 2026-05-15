import { PageAtmosphere } from "@/components/landing/page-atmosphere";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Mission } from "@/components/landing/mission";
import { Plans } from "@/components/landing/plans";
import { SiteHeader } from "@/components/landing/site-header";
import { StatsBar } from "@/components/landing/stats-bar";
import { Waitlist } from "@/components/landing/waitlist";

export default function Home() {
  return (
    <>
      <PageAtmosphere />
      <SiteHeader />
      <main>
        <Hero />
        <StatsBar />
        <Mission />
        <HowItWorks />
        <Plans />
        <Waitlist />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
