import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const NegotiationsTab = () => {
    return (
        <motion.div
            key="negotiations"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={containerVariants}
            className="space-y-8"
        >
            <motion.h2 variants={itemVariants} className="text-2xl font-light text-gray-900 dark:text-gray-100">
                Minhas Negociações
            </motion.h2>

            <motion.div
                variants={itemVariants}
                className="border border-gray-100 dark:border-gray-900 py-16 px-6 text-center"
            >
                <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                        <MessageSquare className="h-6 w-6 text-gray-300 dark:text-gray-700" />
                    </div>
                    <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
                        Sistema em desenvolvimento
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
                        Em breve você poderá acompanhar todas as suas negociações aqui.
                    </p>
                    <div className="pt-4">
                        <span className="inline-block px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs font-light">
                            Em breve
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};