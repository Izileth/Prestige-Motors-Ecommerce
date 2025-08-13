import type { Route } from "./+types/ferrari";
import FearriPage from "~/src/pages/about/brands/ferrari.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Ferrari | Prestige Motors" },
        { name: "description", content: "Sinta a paixão e a exclusividade da Ferrari na Prestige Motors. Conheça os icônicos modelos superesportivos da marca italiana." },
    ];
}

export default function FerrariBrandPage() {
    return (
        <FearriPage />
    );
}