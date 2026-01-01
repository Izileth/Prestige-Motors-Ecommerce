
import type { Route } from "./+types/category";
import { VehiclesByCategoryPage } from "~/src/pages/vehicles/category/category";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Categorias | Prestige Motors" },
        { name: "description", content: "Navegue por categorias de veículos na Prestige Motors. Encontre SUVs, sedans, esportivos e outros modelos de luxo." },
    ];
}

export default function CategoryVehicle() {
    return <VehiclesByCategoryPage/>;
}