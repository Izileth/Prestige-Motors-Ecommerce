import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
export function SignupCTA() {
    const [isHovered, setIsHovered] = useState(false)

    const handleSignIn = () => {
        toast.success("Redirecionando para página de cadastro...")
    }

    return (
        <section className="py-32 md:py-40 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
            >
            <div className="space-y-16">
                <div className="space-y-8">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="h-px bg-gray-900 dark:bg-gray-100 mx-auto"
                />
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-light tracking-wide text-gray-900 dark:text-gray-100"
                >
                    JUNTE-SE À NOSSA
                    <br />
                    PLATAFORMA
                </motion.h2>
                </div>

                <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                Cadastre-se gratuitamente e tenha acesso a ofertas exclusivas, alertas de novos veículos e muito mais.
                </motion.p>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="pt-8"
                >
                <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ y: -6 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-4 px-12 text-lg font-light tracking-widest border-2 border-gray-900 dark:border-gray-100 hover:bg-transparent hover:text-gray-900 dark:hover:bg-transparent dark:hover:text-gray-100 transition-all duration-500"
                    onClick={handleSignIn}
                >
                    ANUNCIAR MEU VEÍCULO
                </motion.button>
                </motion.div>

                <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-sm text-gray-500 dark:text-gray-400 font-light pt-6"
                >
                Leva menos de um minuto para se cadastrar
                </motion.p>
            </div>
            </motion.div>
        </div>
        </section>
    )
}
