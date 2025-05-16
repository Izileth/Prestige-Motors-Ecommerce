import type { Route } from "./+types/forgout";
import RecoverPasswordPage from "~/pages/passwords/forgout";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Redefinição de Senha | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Register() {
    return (
        <RecoverPasswordPage/>
    );
}