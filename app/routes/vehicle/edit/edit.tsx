import type { Route } from "./+types/edit";
import { EditVehiclePage } from "~/src/pages/vehicles/edit/edit";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Edição de Veiculo | Prestige Motors" },
        { name: "description", content: "Edite as informações do seu veículo anunciado na Prestige Motors. Atualize fotos, preço e outros detalhes." },
    ];
}

export default function UpdateVehicle() {
    return (
        <EditVehiclePage/>
    );
}