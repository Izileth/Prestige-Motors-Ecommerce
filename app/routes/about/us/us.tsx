import type { Route } from "./+types/us";
import AboutUsPage from "~/src/pages/about/us/us";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Nossa História | Prestige Motors" },
        { name: "description", content: "Conheça a história da Prestige Motors, sua paixão por carros de luxo e o compromisso em realizar os sonhos de seus clientes." },
    ];
}

export default function AboutUs() {
    return (
        <AboutUsPage/>
    );
}