import type { Route } from "./+types/reset";
import ResetPasswordPage from "~/src/pages/passwords/reset";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Criação de Senha | Prestige Motors" },
        { name: "description", content: "Crie uma nova senha para sua conta na Prestige Motors e volte a acessar nossos serviços exclusivos." },
    ];
}

export default function ResetPassword() {
    return (
        <ResetPasswordPage/>
    );
}