import type { Route } from "../+types/index";
import VehicleSearchPage from "~/src/components/pages/search/SearchPage";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Search | Prestige Motors" },
        { name: "description", content: "Encontre seu veículo ideal na Prestige Motors." },
    ];
}

export default function Search() {
    return (
        <VehicleSearchPage/>
    );
}