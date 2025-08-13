import type { Route } from "./+types/negociation";
import NegotiationsPage from "~/src/pages/vehicles/negociation/negociation";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Negociação | Prestige Motors" },
        { name: "description", content: "Inicie ou continue uma negociação para a compra de um veículo de luxo na Prestige Motors. Faça sua proposta." },
    ];
}

export default function Negotiation() {
    return (
        <NegotiationsPage/>
    );
}