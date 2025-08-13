import type { Route } from "./+types/id";
import VehicleDetailsPage from "~/src/pages/vehicles/id/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Destaque | Prestige Motors" },
        { name: "description", content: "Veja todos os detalhes deste veículo de luxo na Prestige Motors. Fotos, especificações, informações do vendedor e mais." },
    ];
}

export default function VehicleDetails() {
    return (
        <VehicleDetailsPage/>
    );
}