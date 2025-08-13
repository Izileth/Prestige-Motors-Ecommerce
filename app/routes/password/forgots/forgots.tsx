import type { Route } from "../../+types/index";
import ForgotPasswordPage from "~/src/pages/passwords/forgot";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Redefinição de Senha | Prestige Motors" },
        { name: "description", content: "Esqueceu sua senha? Recupere o acesso à sua conta na Prestige Motors de forma rápida e segura." },
    ];
}

export default function ForgotPassword() {
    return (
        <ForgotPasswordPage/>
    );
}