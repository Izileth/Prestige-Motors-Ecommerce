import type { Route } from "./+types/support";
import SupportPage from "~/pages/about/support/support";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Suporte | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function SupportUs() {
    return (
        <SupportPage/>
    );
}