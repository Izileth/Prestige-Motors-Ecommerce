
import { motion } from "framer-motion"

export const PageHeader = () => (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
    >
    <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">Adicionar Novo Veículo</h1>
    <p className="text-gray-600 font-extralight dark:text-gray-400">
        Preencha os detalhes do veículo que deseja anunciar em nossa loja.
    </p>
    </motion.div>
);