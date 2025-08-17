
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "../../ui/button"
import { useNavigate } from "react-router"

export function GetStartedHero() {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate("/login")
    }

    const handleDocumentation = () => {
        navigate('/polities/privacy')
    }
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-full px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl uppercase font-light tracking-tight text-gray-900 sm:text-6xl">
                    Cadastre-se em 5
                <span className="text-zinc-700"> minutos</span>
                </h1>
                <motion.div
                initial={{ width: 0 }}
                animate={{ width: "40px" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-0.5 bg-black dark:bg-white mx-auto"
                />
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Siga nosso simples processo de configuração para começar sua jornada. Tudo o que você precisa saber, organizado em etapas claras e acionáveis.
                </p>
                
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 flex items-center justify-center gap-x-6"
            >
                <Button onClick={() => handleGetStarted()} size="lg" className="bg-gray-900 rounded-xs uppercase hover:bg-gray-800 text-white px-8 py-3 text-base">
                    Começar
                <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                onClick={() => handleDocumentation()}
                variant="outline"
                size="lg"
                className="border-gray-300 uppercase rounded-xs text-gray-700 hover:bg-gray-50 px-8 py-3 text-base bg-transparent"
                >
                Ver Documentação
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex items-center justify-center gap-x-8 text-sm text-gray-500"
            >
                <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-gray-400" />
                <span>Sem necessidade de cartão de crédito</span>
                </div>
                <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-gray-400" />
                <span>Configuração em 5 minutos</span>
                </div>
                <div className="flex items-center gap-x-2">
                <CheckCircle className="h-4 w-4 text-gray-400" />
                <span>Plano gratuito para sempre</span>
                </div>
            </motion.div>
            </div>
        </div>
        </section>
    )
}
