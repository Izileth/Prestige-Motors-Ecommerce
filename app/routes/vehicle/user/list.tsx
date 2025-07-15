import type { Route } from "../+types/vehicle";
import { UserVehicleList } from "~/src/pages/vehicles/user/user.list";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meus Veículos | Prestige Motors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function VehicleUserList() {
  return <UserVehicleList />;
}
