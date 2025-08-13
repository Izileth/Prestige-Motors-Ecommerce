import type { Route } from "./+types/amg";
import AmgPage from "~/src/pages/about/brands/amg.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Mercdes AMG | Prestige Motors" },
        { name: "description", content: "Explore a linha de veículos Mercedes-AMG na Prestige Motors. Conheça os modelos, desempenho e tecnologia dos esportivos de luxo da AMG." },
    ];
}

export default function AmgBrandPage() {
    return (
        <AmgPage/>
    );
}