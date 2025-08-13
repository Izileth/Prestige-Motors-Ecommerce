import type { Route } from "./+types/privacy";
import PrivacyPolicyPage from "~/src/pages/polities/privacy/privacy";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Política de Privacidade | Prestige Motors" },
        { name: "description", content: "Conheça nossa política de privacidade e saiba como a Prestige Motors protege e utiliza seus dados pessoais." },
    ];
}

export default function Privacy() {
    return (
        <PrivacyPolicyPage/>
    );
}    