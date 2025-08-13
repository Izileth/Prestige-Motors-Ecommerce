import type { Route } from "./+types/toyota";
import ToyotaPage from "~/src/pages/about/brands/toyota.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Toyota | Prestige Motors" },
        { name: "description", content: "Conheça a confiabilidade e a inovação dos veículos Toyota na Prestige Motors. Explore nossa seleção de carros da marca." },
    ];
}

export default function ToyotaBrandPage() {
    return (
        <ToyotaPage/>
    );
}