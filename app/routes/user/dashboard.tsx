import type { Route } from "./+types/dashboard";
import DashboardPage from "~/src/pages/profile/profile";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Dashboard() {
    return (
        <DashboardPage/>
    );
}