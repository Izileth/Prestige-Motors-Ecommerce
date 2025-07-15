import type { Route } from "./+types/newsletter";
import NewsletterPage from "~/src/pages/newsletter/newsletter";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Exclusivos | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function NewsLetter() {
    return (
        <NewsletterPage/>
    );
}