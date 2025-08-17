import { User, Settings, Rocket, CheckCircle } from "lucide-react"

export const steps = [
    {
        id: 1,
        name: "Criar Conta",
        description: "Inscreva-se com seu e-mail e crie sua conta segura em menos de 30 segundos.",
        icon: User,
        status: "aberto",
    },
    {
        id: 2,
        name: "Configurar Preferências",
        description: "Personalize suas preferências e configure seu espaço de trabalho exatamente como você deseja.",
        icon: Settings,
        status: "aberto",
    },
    {
        id: 3,
        name: "Iniciar e Explorar",
        description: "Comece a usar todos os recursos imediatamente com nosso tour guiado e dicas úteis.",
        icon: Rocket,
        status: "aberto",
    },
]