import type { Route } from "./+types/id";
import VehicleDetailsPage from "~/pages/vehicles/id/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Destaque | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function VehicleDetails() {
    return (
        <VehicleDetailsPage/>
    );
}