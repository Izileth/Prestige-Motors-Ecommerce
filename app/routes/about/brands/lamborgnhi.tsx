import type { Route } from "./+types/lamborgnhi";
import LamborghiniPage from "~/src/pages/about/brands/lamborgnhi.brand";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Lamborghini | Prestige Motors" },
        { name: "description", content: "Explore o design arrojado e o desempenho extremo dos carros da Lamborghini na Prestige Motors. Veja os modelos disponíveis." },
    ];
}

export default function LamborgnhiBrandPage() {
    return (
        <LamborghiniPage />
    );
}
