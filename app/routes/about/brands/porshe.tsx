import type { Route } from "./+types/lamborgnhi";
import PorshePage from "~/src/pages/about/brands/porshe.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Porshe | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function PorsheBrandPage() {
    return (
        <PorshePage />
    );
}