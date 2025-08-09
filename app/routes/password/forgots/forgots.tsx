import type { Route } from "../../+types/index";
import ForgotPasswordPage from "~/src/pages/passwords/forgot";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Redefinição de Senha | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function ForgotPassword() {
    return (
        <ForgotPasswordPage/>
    );
}