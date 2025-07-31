import type { Route } from "./+types/bmw";
import BmwPage from "~/src/pages/about/brands/bmw.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "BMW | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function BmwBrandPage() {
    return (
        <BmwPage/>
    );
}