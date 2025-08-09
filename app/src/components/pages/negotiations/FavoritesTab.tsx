import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "~/src/components/ui/button";
import { Skeleton } from "~/src/components/ui/skeleton";
import { Heart, Search, ArrowRight } from "lucide-react";
import { FavoriteVehicleCard } from "./FavoriteVehicleCard";
import type { Vehicle } from "~/src/types/vehicle";
import { EmptyState } from "./EmpyState";

interface FavoritesTabProps {
    loading: boolean;
    favorites: Vehicle[];
    expandedVehicle: string | null;
    toggleExpandVehicle: (vehicleId: string) => void;
    handleRemoveFavorite: (vehicleId: string) => void;
    handleStartNegotiation: (vehicleId: string, message: string) => Promise<void>;
    isMessageSending: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

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

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export const FavoritesTab = ({ 
    loading, 
    favorites, 
    expandedVehicle, 
    toggleExpandVehicle, 
    handleRemoveFavorite,
    handleStartNegotiation,
    isMessageSending,
    messagesEndRef
}: FavoritesTabProps) => {

    // Debug: log para verificar o estado
    console.log("FavoritesTab - expandedVehicle:", expandedVehicle);

    return (
        <motion.div
            key="favorites"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={containerVariants}
            className="space-y-8"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100">
                    Veículos Favoritados
                </h2>
                <Link
                    to="/vehicles"
                    className="text-sm font-light text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                    Explorar veículos
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </motion.div>

            {loading ? (
                <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                        >
                            <Skeleton className="w-full h-48 bg-gray-100 dark:bg-gray-900" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-6 w-3/4 bg-gray-100 dark:bg-gray-900" />
                                <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-900" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16 bg-gray-100 dark:bg-gray-900" />
                                    <Skeleton className="h-6 w-16 bg-gray-100 dark:bg-gray-900" />
                                </div>
                                <Skeleton className="h-8 w-1/3 bg-gray-100 dark:bg-gray-900" />
                                <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-900" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : favorites.length === 0 ? (
                <motion.div variants={itemVariants}>
                    <EmptyState
                        icon={<Heart className="h-8 w-8" />}
                        title="Nenhum veículo favoritado"
                        description="Adicione veículos aos favoritos para acompanhar preços e iniciar negociações."
                        action={
                            <Button
                                asChild
                                className="mt-4 bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-lg px-8 py-2 h-auto font-light"
                            >
                                <Link to="/vehicles">
                                    <Search className="mr-2 h-4 w-4" />
                                    Explorar veículos
                                </Link>
                            </Button>
                        }
                    />
                </motion.div>
            ) : (
                <motion.div 
                    variants={gridVariants}
                    className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {favorites.map((vehicle, index) => (
                        <motion.div
                            key={vehicle.id}
                            variants={itemVariants}
                            className={`${expandedVehicle === vehicle.id ? 'md:col-span-2 lg:col-span-3 xl:col-span-4' : ''}`}
                        >
                            <FavoriteVehicleCard 
                                vehicle={vehicle}
                                expandedVehicle={expandedVehicle}
                                toggleExpandVehicle={toggleExpandVehicle}
                                handleRemoveFavorite={handleRemoveFavorite}
                                handleStartNegotiation={handleStartNegotiation}
                                isMessageSending={isMessageSending}
                                messagesEndRef={messagesEndRef}
                                index={index}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};