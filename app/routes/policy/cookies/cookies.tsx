import type { Route } from "./+types/cookies";
import CookiePolicyPage from "~/src/pages/polities/cookies/cookies";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Política de Cookies | Prestige Motors" },
        { name: "description", content: "Entenda como a Prestige Motors utiliza cookies para melhorar sua experiência de navegação em nosso site." },
    ];
}

export default function Cookies() {
    return (
        <CookiePolicyPage/>
    );
}