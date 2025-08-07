import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import { Testimonials } from "~/src/components/pages/home/TestimonialRadom";
import { PartnerBrands } from "~/src/components/pages/home/PartinerBrands";
import { SignupCTA } from "~/src/components/pages/home/CtaButton";
import { CategoryGrid } from "~/src/components/template/grid/CategoryGrid";
import { RandomVehicles } from "~/src/components/pages/home/VehicleRadonList";

export function Welcome() {
  return (
    <main className="flex flex-col max-w-full w-full">
      <Carousel items={DestactsCars} />
      <RandomVehicles />
      <CategoryGrid />
      <PartnerBrands />
      <Testimonials />
      <SignupCTA />
    </main>
  );
}
