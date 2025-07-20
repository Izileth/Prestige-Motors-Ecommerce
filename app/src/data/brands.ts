export interface Brand {
    id: number
    name: string
    logo: string
    link: string
}
import Brand_AMG from '~/src/assets/Brand_AMG.png'
import Brand_Toyota from '~/src/assets/Brand_Toyota.png'
import Brand_Porshe from '~/src/assets/Brand_Porshe.png'
import Brand_Ferrari from '~/src/assets/Brand_Ferrari.png'
import Brand_Lamborginhi from '~/src/assets/Brand_Lamborginhi.png'
import Brand_BMW from '~/src/assets/Brand_BMW.png'

export const VehicleBrands: Brand[] = [
    {
        id: 1,
        name: "AMG",
        logo:  Brand_AMG,
        link: "/about/amg"
    },
    {
        id: 2,
        name: "Toyota",
        logo: Brand_Toyota,
        link: "/about/toyota"
    },
    {
        id: 3,
        name: "Porshe",
        logo: Brand_Porshe,
        link: "/about/porshe"
    },
    {
        id: 4,
        name: "Ferrari",
        logo: Brand_Ferrari,
        link: "/about/ferrari"
    },
    {
        id: 5,
        name: "Lamborginhi",
        logo: Brand_Lamborginhi,
        link: "/about/lamborghini"
    },
    {
        id: 6,
        name: "BMW",
        logo: Brand_BMW,
        link: "/about/bmw"
    }
]