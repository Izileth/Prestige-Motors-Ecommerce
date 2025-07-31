import type { Route } from "./+types/amg";
import AmgPage from "~/src/pages/about/brands/amg.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Mercdes AMG | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function AmgBrandPage() {
    return (
        <AmgPage/>
    );
}