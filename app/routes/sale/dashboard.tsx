import type { Route } from "../+types/index";
import SalesDashboard from "~/src/pages/sales/sale";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard de Vendas | Prestige Motors" },
        { name: "description", content: "Acompanhe o desempenho de suas vendas no dashboard da Prestige Motors. Gráficos, estatísticas e informações importantes." },
    ];
}

export default function SalesDashboarsd() {
    return (
        <SalesDashboard/>
    );
}