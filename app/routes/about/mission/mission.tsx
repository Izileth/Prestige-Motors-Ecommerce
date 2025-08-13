import type { Route } from "./+types/mission";
import OurMissionPage from "~/src/pages/about/mission/mission";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Quem Somos | Prestige Motors" },
        { name: "description", content: "Saiba mais sobre a missão da Prestige Motors: oferecer os melhores veículos de luxo com um serviço de excelência e transparência." },
    ];
}

export default function OurMission() {
    return (
        <OurMissionPage/>
    );
}