import type { Route } from "./+types/dashboard";
import SaleDetailPage from "~/src/pages/sales/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Detalhes da Venda| Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function SalesDetailsPage() {
    return (
        <SaleDetailPage/>
    );
}