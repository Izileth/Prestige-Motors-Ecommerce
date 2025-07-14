import type { Route } from "./+types/edit";
import { EditVehiclePage } from "~/pages/vehicles/edit/edit";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Edição de Veiculo | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function UpdateVehicle() {
    return (
        <EditVehiclePage/>
    );
}