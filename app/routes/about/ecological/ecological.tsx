import type { Route } from "./+types/ecological";
import SustainabilityPage from "~/pages/about/ecological/ecological";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Políticas Ecológicas | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Sustainability() {
    return (
        <SustainabilityPage/>
    );
}