import type { Route } from "./+types/toyota";
import ToyotaPage from "~/src/pages/about/brands/toyota.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Toyota | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function ToyotaBrandPage() {
    return (
        <ToyotaPage/>
    );
}