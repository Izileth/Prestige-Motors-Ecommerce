import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Zap, Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type EmptyStateType = 'noVehicles' | 'noResults';

interface EmptyStateProps {
    type: EmptyStateType;
    clearFilters?: () => void;
}

export const EmptyState = ({ type, clearFilters }: EmptyStateProps) => {
    const config = {
        noVehicles: {
            icon: Zap,
            title: "Nenhum veículo cadastrado",
            message: "Você ainda não tem veículos cadastrados. Comece anunciando seu primeiro veículo para alcançar potenciais compradores.",
            button: (
                <Button
                    className="mt-2 bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 gap-2"
                    asChild
                >
                    <Link to="/vehicles/create">
                        <PlusCircle className="h-4 w-4" />
                        Criar primeiro veículo
                    </Link>
                </Button>
            ),
        },
        noResults: {
            icon: Search,
            title: "Nenhum resultado encontrado",
            message: "Não encontramos veículos que correspondam aos seus filtros. Tente ajustar os critérios de busca.",
            button: (
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    Limpar filtros
                </Button>
            ),
        },
    };

    const { icon: Icon, title, message, button } = config[type];

    return (
        <motion.div
            variants={fadeIn}
            className="flex flex-col items-center justify-center py-16 gap-6 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800"
        >
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
                <Icon className="h-8 w-8 text-gray-400 dark:text-gray-600" />
            </div>
            <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">{message}</p>
            </div>
            {button}
        </motion.div>
    );
};