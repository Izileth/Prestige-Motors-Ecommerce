import type { Route } from "./+types/login";
import LoginPage from "~/src/pages/auth/login";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login | Prestige Motors" },
        { name: "description", content: "Acesse sua conta na Prestige Motors para gerenciar seus veículos, negociações e dados pessoais com segurança." },
    ];
}

export default function Login() {
    return (
        <LoginPage/>
    );
}