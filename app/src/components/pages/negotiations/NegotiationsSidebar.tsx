
import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Heart, MessageSquare } from "lucide-react";

const tabVariants = {
    inactive: { opacity: 0.7, x: 0 },
    active: { opacity: 1, x: 0 },
};
type ActiveTab = "favorites" | "negotiations";

// Interface para as props do componente
interface NegotiationsSidebarProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    favoritesCount: number;
    handleProfile: () => void;
}


export const NegotiationsSidebar = ({ activeTab, setActiveTab, favoritesCount, handleProfile }: NegotiationsSidebarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-64 mb-8 lg:mb-0"
        >
            <div className="border-b border-gray-100 dark:border-gray-900 pb-6 mb-6">
                <h2 className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    Minha Atividade
                </h2>
                <div className="space-y-1">
                    <motion.div
                        variants={tabVariants}
                        animate={activeTab === "favorites" ? "active" : "inactive"}
                        className="relative"
                    >
                        <Button
                            variant="ghost"
                            className={`w-full justify-start py-2 px-3 rounded-none text-base font-light ${
                                activeTab === "favorites" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                            }`}
                            onClick={() => setActiveTab("favorites")}
                        >
                            <Heart
                                className={`mr-3 h-4 w-4 ${
                                    activeTab === "favorites" ? "fill-black dark:fill-white" : "fill-none"
                                }`}
                            />
                            Favoritos
                            {favoritesCount > 0 && (
                                <Badge
                                    className={`ml-auto ${
                                        activeTab === "favorites"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                    } rounded-full text-xs font-light`}
                                >
                                    {favoritesCount}
                                </Badge>
                            )}
                        </Button>
                        {activeTab === "favorites" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute left-0 top-0 w-0.5 h-full bg-black dark:bg-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.div>

                    <motion.div
                        variants={tabVariants}
                        animate={activeTab === "negotiations" ? "active" : "inactive"}
                        className="relative"
                    >
                        <Button
                            variant="ghost"
                            className={`w-full justify-start py-2 px-3 rounded-none text-base font-light ${
                                activeTab === "negotiations" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                            }`}
                            onClick={() => setActiveTab("negotiations")}
                        >
                            <MessageSquare className="mr-3 h-4 w-4" />
                            Negociações
                        </Button>
                        {activeTab === "negotiations" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute left-0 top-0 w-0.5 h-full bg-black dark:bg-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.div>
                </div>
            </div>

            <div>
                <h2 className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    Minha Conta
                </h2>
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start py-2 px-3 rounded-none text-base font-light text-gray-500 dark:text-gray-400"
                        onClick={handleProfile}
                    >
                        Perfil
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start py-2 px-3 rounded-none text-base font-light text-gray-500 dark:text-gray-400"
                        onClick={handleProfile}
                    >
                        Configurações
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
