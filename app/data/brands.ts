export interface Brand {
    id: number
    name: string
    logo: string
    link: string
}
import Brand_AMG from '~/assets/Brand_AMG.png'
import Brand_Toyota from '~/assets/Brand_Toyota.png'
import Brand_Porshe from '~/assets/Brand_Porshe.png'
import Brand_Ferrari from '~/assets/Brand_Ferrari.png'
import Brand_Lamborginhi from '~/assets/Brand_Lamborginhi.png'
import Brand_BMW from '~/assets/Brand_BMW.png'

export const VehicleBrands: Brand[] = [
    {
        id: 1,
        name: "AMG",
        logo:  Brand_AMG,
        link: "/marca/fiat"
    },
    {
        id: 2,
        name: "Toyota",
        logo: Brand_Toyota,
        link: "/marca/volkswagen"
    },
    {
        id: 3,
        name: "Porshe",
        logo: Brand_Porshe,
        link: "/marca/chevrolet"
    },
    {
        id: 4,
        name: "Ferrari",
        logo: Brand_Ferrari,
        link: "/marca/ford"
    },
    {
        id: 5,
        name: "Lamborginhi",
        logo: Brand_Lamborginhi,
        link: "/marca/toyota"
    },
    {
        id: 6,
        name: "BMW",
        logo: Brand_BMW,
        link: "/marca/honda"
    }
]