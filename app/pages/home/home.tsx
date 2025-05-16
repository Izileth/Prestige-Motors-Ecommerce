import { Carousel } from "~/components/template/carousel/carousel";
import { DestactsCars } from "~/data/carousel";
import { Testimonials } from "~/components/template/testmonial/testmonial";
import { PartnerBrands } from "~/components/template/brands/brand";
import { SignupCTA } from "~/components/template/cta/cta";
import { Banner } from "~/components/layout/banner/banner";
import Navigation from "~/components/layout/navigation/navgation";
import Footer from "~/components/layout/footer/footer";
export function Welcome() {
    return(
        <main className="flex flex-col max-w-full w-full">
            <Carousel items={DestactsCars}/>
            <Testimonials/>
            <PartnerBrands/>
            <SignupCTA/>
        </main>
    )
}