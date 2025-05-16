import type { Route } from "./+types/update";
import { EditVehiclePage } from "~/pages/vehicles/update/update";
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