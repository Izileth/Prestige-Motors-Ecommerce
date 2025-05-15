import type { Route } from "./+types/index";
import { Welcome } from "~/pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Presitige Motors" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
