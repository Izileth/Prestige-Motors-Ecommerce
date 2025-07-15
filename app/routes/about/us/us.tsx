import type { Route } from "./+types/us";
import AboutUsPage from "~/src/pages/about/us/us";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Nossa História | Prestige Motors" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function AboutUs() {
    return (
        <AboutUsPage/>
    );
}