import { Carousel } from "~/src/components/template/carousel/carousel"
import { FeaturedCars } from "~/src/data/carousel"
import { VehiclesDestactsListing } from "~/src/components/template/destacts/destacts"

export default function DestactsPage(){
    return(
        <main>
            <Carousel items={FeaturedCars} className="max-w-full w-full"/>
            <VehiclesDestactsListing/>
        </main>
    )
}