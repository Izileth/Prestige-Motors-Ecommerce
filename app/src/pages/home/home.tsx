import { Carousel } from "~/src/components/template/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import { Testimonials } from "~/src/components/pages/initial/TestimonialRadom";
import { PartnerBrands } from "~/src/components/pages/initial/PartinerBrands";
import { SignupCTA } from "~/src/components/pages/initial/CtaButton";
import { CategoryGrid } from "~/src/components/template/grid/CategoryGrid";
import { RandomVehicles } from "~/src/components/pages/initial/VehicleRadonList";
export function Welcome() {
  return (
    <main className="flex flex-col max-w-full w-full">
      <Carousel items={DestactsCars} />
      <PartnerBrands />
      <CategoryGrid />
      <RandomVehicles />
      <Testimonials />
      <SignupCTA />
    </main>
  );
}
