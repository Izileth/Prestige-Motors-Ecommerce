import type { Route } from "./+types/negociation";
import RegisterPage from "~/pages/auth/register";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Negociação | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Negociation() {
    return (
        <RegisterPage/>
    );
}