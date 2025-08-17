
import { motion } from "framer-motion"
import { ArrowRight} from "lucide-react"
import { Button } from "../../ui/button"
import { useNavigate } from "react-router"
import { features } from "~/src/data/features"

export function StartedCTA() {
    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate("/login")
    }
    return (
        <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl font-light uppercase tracking-tight text-gray-900 sm:text-6xl">Pronto para Começar?</h2>
                <p className="mt-4 text-lg text-gray-600">
                Junte-se a milhares de usuários que já começaram sua jornada conosco.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10"
            >
                <Button onClick={() => handleSignIn()} size="lg" className="bg-gray-900 uppercase hover:bg-gray-800 text-white px-12 py-4 rounded-xs text-lg">
                    Começar
                <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
                {features.map((feature, index) => (
                <div key={index} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <feature.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 text-center"
            >
                <p className="text-sm text-gray-500">Sem compromisso • Cancele a qualquer momento • Suporte 24/7</p>
            </motion.div>
            </div>
        </div>
        </section>
    )
}
