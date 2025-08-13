import type { Route } from "./+types/id";
import SaleDetailPage from "~/src/pages/sales/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Detalhes da Venda| Prestige Motors" },
        { name: "description", content: "Veja todos os detalhes de uma venda específica na Prestige Motors, incluindo informações do veículo, comprador e valores." },
    ];
}

export default function SalesDetailsPage() {
    return (
        <SaleDetailPage/>
    );
}