import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { DestactsCars } from "~/src/data/carousel";
import {
  
  RandomVehicles,
  CategoryGrid,
  PartnerBrands,
  TestimonialsCarousel as Testimonials,
  SignupCTA,  
} from '~/src/components/pages/home'

export function Home() {
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
