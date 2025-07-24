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
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100">Veículos Favoritados</h2>
            <Link
            to="/vehicles"
            className="text-sm font-light text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
            >
            Explorar veículos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
        </motion.div>

        {loading ? (
            <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
                <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-100 dark:border-gray-900 p-6"
                >
                <div className="flex gap-6">
                    <Skeleton className="w-32 h-32 bg-gray-100 dark:bg-gray-900" />
                    <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-100 dark:bg-gray-900" />
                    <Skeleton className="h-4 w-1/4 bg-gray-100 dark:bg-gray-900" />
                    <Skeleton className="h-6 w-1/3 bg-gray-100 dark:bg-gray-900" />
                    <div className="pt-4">
                        <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-900" />
                    </div>
                    </div>
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
                    className="mt-4 bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-none px-8 py-2 h-auto font-light"
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
            <motion.div variants={itemVariants} className="space-y-6">
            {favorites.map((vehicle) => (
                <FavoriteVehicleCard 
                key={vehicle.id} 
                    vehicle={vehicle}
                    expandedVehicle={expandedVehicle}
                    toggleExpandVehicle={toggleExpandVehicle}
                    handleRemoveFavorite={handleRemoveFavorite}
                    handleStartNegotiation={handleStartNegotiation}
                    isMessageSending={isMessageSending}
                     messagesEndRef={messagesEndRef}
                />
            ))}
            </motion.div>
        )}
        </motion.div>
    );
};