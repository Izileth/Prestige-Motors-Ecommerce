import type { Route } from "./+types/newsletter";
import NewsletterPage from "~/src/pages/newsletter/newsletter";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Exclusivos | Prestige Motors" },
        { name: "description", content: "Assine nossa newsletter e receba em primeira mão as novidades, ofertas exclusivas e os lançamentos da Prestige Motors." },
    ];
}

export default function NewsLetter() {
    return (
        <NewsletterPage/>
    );
}