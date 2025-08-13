import type { Route } from "./+types/dashboard";
import DashboardPage from "~/src/pages/profile/profile";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard | Prestige Motors" },
        { name: "description", content: "Acesse seu dashboard na Prestige Motors para gerenciar seus anúncios, negociações, favoritos e informações de perfil." },
    ];
}

export default function Dashboard() {
    return (
        <DashboardPage/>
    );
}