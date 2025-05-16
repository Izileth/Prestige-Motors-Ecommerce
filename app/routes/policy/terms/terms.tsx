import type { Route } from "./+types/terms";
import TermsPage from "~/pages/polities/terms/terms";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Termos & Condições | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Terms() {
    return (
        <TermsPage/>
    );
}