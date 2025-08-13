import type { Route } from "./+types/destacts";
import DestactsPage from "~/src/pages/featureds/featureds";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Destaques | Prestige Motors" },
        { name: "description", content: "Confira os veículos em destaque na Prestige Motors. Uma seleção especial dos carros mais desejados e exclusivos do mercado." },
    ];
}

export default function Destacts() {
    return (
        <DestactsPage/>
    );
}