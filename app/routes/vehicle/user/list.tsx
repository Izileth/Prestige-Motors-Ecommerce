import type { Route } from "../+types/vehicle";
import { UserVehicleList } from "~/src/pages/vehicles/user/user.list";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meus Veículos | Prestige Motors" },
    { name: "description", content: "Veja a lista de todos os seus veículos anunciados na Prestige Motors. Gerencie seus anúncios em um só lugar." },
  ];
}

export default function VehicleUserList() {
  return <UserVehicleList />;
}
