import type { Route } from "./+types/vehicle";
import VehicleListingPage from "~/pages/vehicles/listing/listing";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Veículos | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Vehicle() {
    return (
        <VehicleListingPage/>
    );
}