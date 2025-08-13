import type { Route } from "./+types/register";
import RegisterPage from "~/src/pages/auth/register";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Registro | Prestige Motors" },
        { name: "description", content: "Cadastre-se na Prestige Motors para anunciar seus veículos, fazer propostas e ter uma experiência de compra e venda exclusiva." },
    ];
}

export default function Register() {
    return (
        <RegisterPage/>
    );
}