import { User } from "lucide-react";
import type { Route } from "./+types/profile";
import { UserVehicleList } from "~/pages/vehicles/user/user.list";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Meus Veículos | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function VehicleUserList() {
    return (
        <UserVehicleList/>
    );
}