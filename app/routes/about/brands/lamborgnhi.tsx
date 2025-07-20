import type { Route } from "./+types/lamborghini.brand";
import LamborghiniPage from "~/src/pages/about/brands/lamborgnhi.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Lamborghini | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function LamborgnhiBrandPage() {
    return (
        <LamborghiniPage />
    );
}
