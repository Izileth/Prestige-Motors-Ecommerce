import type { Route } from "./+types/index";
import { Home } from "~/src/pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Incio | Presitige Motors" },
    { name: "description", content: "Encontre carros de luxo e alto desempenho na Prestige Motors. Navegue por nosso inventário exclusivo e descubra o carro dos seus sonhos." },
  ];
}

export default function Main() {
  return <Home />;
}
