
import type { Route } from "./+types/category";
import { VehiclesByCategoryPage } from "~/pages/vehicles/category/category";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Categorias | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function CategoryVehicle() {
    return <VehiclesByCategoryPage/>;
}