import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import {
  GetStartedCTA,
  RandomVehicles,
  CategoryGrid,
  PartnerBrands,
  Testimonials,
  SignupCTA,
  StartedCTA,
  OnboardingSteps
} from '~/src/components/pages/home'

export function Home() {
  return (
    <main className="flex flex-col max-w-full w-full">
      <Carousel items={DestactsCars} />
      <GetStartedCTA />
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
