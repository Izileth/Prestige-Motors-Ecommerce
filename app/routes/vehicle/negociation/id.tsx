import type { Route } from "./+types/negociation";
import { NegotiationDetailsPage } from "~/src/pages/vehicles/negociation/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Detalhes da Negociação | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function NegotiationDetails() {
    return (
        <NegotiationDetailsPage/>
    );
}