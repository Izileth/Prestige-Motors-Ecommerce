import { Carousel } from "~/components/template/carousel/carousel";
import { DestactsCars } from "~/data/carousel";
import { Testimonials } from "~/components/template/testmonial/testmonial";
import { PartnerBrands } from "~/components/template/brands/brand";
import { SignupCTA } from "~/components/template/cta/cta";
import { CategoryGrid } from "~/components/template/grid/grid";
import { RandomVehicles } from "~/components/template/random/ramdom";
export function Welcome() {
    return(
        <main className="flex flex-col max-w-full w-full">
            <Carousel items={DestactsCars}/>
            <CategoryGrid/>
            <Testimonials/>
            <RandomVehicles/>
            <PartnerBrands/>
            <SignupCTA/>
        </main>
    )
}