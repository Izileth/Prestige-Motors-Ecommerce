import { Carousel } from "~/src/components/template/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import { Testimonials } from "~/src/components/pages/loby/TestimonialRadom";
import { PartnerBrands } from "~/src/components/pages/loby/PartinerBrands";
import { SignupCTA } from "~/src/components/pages/loby/CtaButton";
import { CategoryGrid } from "~/src/components/template/grid/CategoryGrid";
import { RandomVehicles } from "~/src/components/pages/loby/VehicleRadonList";
export function Welcome() {
  return (
    <main className="flex flex-col max-w-full w-full">
      <Carousel items={DestactsCars} />
      <CategoryGrid />
      <RandomVehicles />
      <PartnerBrands />
      <Testimonials />
      <SignupCTA />
    </main>
  );
}
