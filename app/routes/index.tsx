import type { Route } from "./+types/index";
import { Welcome } from "~/src/pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Incio | Presitige Motors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
