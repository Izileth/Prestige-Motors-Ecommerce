import type { Route } from "./+types/negociation";
import { NegotiationDetailsPage } from "~/src/pages/vehicles/negociation/id";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Detalhes da Negociação | Prestige Motors" },
        { name: "description", content: "Acompanhe os detalhes da sua negociação na Prestige Motors. Mensagens, propostas e o histórico completo da conversa." },
    ];
}

export default function NegotiationDetails() {
    return (
        <NegotiationDetailsPage/>
    );
}