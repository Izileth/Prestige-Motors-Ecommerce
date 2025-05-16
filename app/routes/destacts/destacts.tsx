import type { Route } from "./+types/destacts";
import DestactsPage from "~/pages/featureds/featureds";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Destaques | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Destacts() {
    return (
        <DestactsPage/>
    );
}