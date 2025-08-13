import type { Route } from "./+types/terms";
import TermsPage from "~/src/pages/polities/terms/terms";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Termos & Condições | Prestige Motors" },
        { name: "description", content: "Consulte os termos e condições de uso da plataforma Prestige Motors para compra e venda de veículos de luxo." },
    ];
}

export default function Terms() {
    return (
        <TermsPage/>
    );
}