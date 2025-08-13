import type { Route } from "./+types/bmw";
import BmwPage from "~/src/pages/about/brands/bmw.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "BMW | Prestige Motors" },
        { name: "description", content: "Descubra a elegância e a potência dos veículos BMW na Prestige Motors. Veja nosso catálogo de modelos BMW e encontre o seu." },
    ];
}

export default function BmwBrandPage() {
    return (
        <BmwPage/>
    );
}