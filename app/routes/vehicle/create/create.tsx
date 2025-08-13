import type { Route } from "./+types/create";
import CreateVehiclePage from "~/src/pages/vehicles/create/create";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Adcionar um Veículo | Prestige Motors" },
    { name: "description", content: "Anuncie seu veículo de luxo na Prestige Motors. Crie um anúncio completo com fotos, vídeos e todas as informações." },
  ];
}

export default function CreateVehicle() {
  return <CreateVehiclePage />;
}