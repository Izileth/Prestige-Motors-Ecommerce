import type { Route } from "../+types/index";
import SalesDashboard from "~/src/pages/sales/sale";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard de Vendas | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function SalesDashboarsd() {
    return (
        <SalesDashboard/>
    );
}