import type { Route } from "./+types/ferrari";
import FearriPage from "~/src/pages/about/brands/ferrari.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Ferrari | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function FerrariBrandPage() {
    return (
        <FearriPage />
    );
}