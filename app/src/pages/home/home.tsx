import { Carousel } from "~/src/components/template/carousel/carousel";
import { DestactsCars } from "~/src/data/carousel";
import { Testimonials } from "~/src/components/template/testmonial/testmonial";
import { PartnerBrands } from "~/src/components/template/brands/brand";
import { SignupCTA } from "~/src/components/template/cta/cta";
import { CategoryGrid } from "~/src/components/template/grid/grid";
import { RandomVehicles } from "~/src/components/template/random/ramdom";
export function Welcome() {
    return(
        <main className="flex flex-col max-w-full w-full">
            <Carousel items={DestactsCars}/>
            <CategoryGrid/>
            <RandomVehicles/>
            <PartnerBrands/>
            <Testimonials/>
            <SignupCTA/>
        </main>
    )
}