import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import { Testimonials } from "~/src/components/pages/home/TestimonialRadom";
import { PartnerBrands } from "~/src/components/pages/home/PartinerBrands";
import { SignupCTA } from "~/src/components/pages/home/CtaButton";
import { CategoryGrid } from "~/src/components/pages/home/CategoryGrid";
import { RandomVehicles } from "~/src/components/pages/home/VehicleRadonList";
import { OnboardingSteps } from "~/src/components/pages/home/OnboardingSteps";
import { GetStartedHero } from "~/src/components/pages/home/GetStarted";
import { StartedCTA } from "~/src/components/pages/home/StartedCta";
export function Home() {
  return (
    <main className="flex flex-col max-w-full w-full">
      <Carousel items={DestactsCars} />
      <GetStartedHero />
      <RandomVehicles />
      <CategoryGrid />
      <PartnerBrands />
      <Testimonials />
      <SignupCTA />
      <StartedCTA />
      <OnboardingSteps />
    </main>
  );
}
