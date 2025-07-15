import type { Route } from "./+types/negociation";
import NegotiationsPage from "~/src/pages/vehicles/negociation/negociation";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Negociação | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Negociation() {
    return (
        <NegotiationsPage/>
    );
}