import type { Route } from "./+types/vehicle";
import VehicleListingPage from "~/src/pages/vehicles/listing/listing";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Veículos | Prestige Motors" },
    { name: "description", content: "Explore nosso catálogo completo de veículos de luxo à venda na Prestige Motors. Filtre por marca, modelo, ano e muito mais." },
  ];
}

export default function Vehicle() {
  return <VehicleListingPage />;
}
