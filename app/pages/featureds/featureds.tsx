import { Carousel } from "~/components/template/carousel/carousel"
import { FeaturedCars } from "~/data/carousel"
import { VehiclesDestactsListing } from "~/components/template/destacts/destacts"

export default function DestactsPage(){
    return(
        <main>
            <Carousel items={FeaturedCars} className="max-w-full w-full"/>
            <VehiclesDestactsListing/>
        </main>
    )
}