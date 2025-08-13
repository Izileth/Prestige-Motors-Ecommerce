import type { Route } from "./+types/lamborgnhi";
import PorshePage from "~/src/pages/about/brands/porshe.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Porshe | Prestige Motors" },
        { name: "description", content: "Encontre o equilíbrio perfeito entre luxo e esportividade com os veículos Porsche na Prestige Motors. Descubra nossos modelos." },
    ];
}

export default function PorsheBrandPage() {
    return (
        <PorshePage />
    );
}