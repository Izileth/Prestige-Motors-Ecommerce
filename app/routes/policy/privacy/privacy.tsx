import type { Route } from "./+types/privacy";
import PrivacyPolicyPage from "~/src/pages/polities/privacy/privacy";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Política de Privacidade | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Privacy() {
    return (
        <PrivacyPolicyPage/>
    );
}    