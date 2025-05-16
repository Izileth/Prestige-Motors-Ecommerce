import type { Route } from "./+types/create";
import CreateVehiclePage from "~/pages/vehicles/create/create";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Adcionar um Veículo | Prestige Motors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CreateVehicle() {
  return <CreateVehiclePage />;
}