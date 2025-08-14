import { Carousel } from "~/src/components/template/carousel/RadomCarousel";
import { FeaturedCars } from "~/src/data/carousel";
import { VehiclesDestactsListing } from "~/src/components/pages/home/VehicleDestactsList";

export default function DestactsPage() {
  return (
    <main>
      <Carousel items={FeaturedCars} className="max-w-full w-full" />
      <div className="container mx-auto w-full max-w-full p-4 space-y-6">
        <VehiclesDestactsListing />
      </div>
    </main>
  );
}
