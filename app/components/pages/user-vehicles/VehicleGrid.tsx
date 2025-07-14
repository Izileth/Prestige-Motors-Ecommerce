import { motion } from "framer-motion";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle } from "~/types/vehicle"; // Ajuste o caminho conforme sua estrutura

// Interface para as props do VehicleGrid
interface VehicleGridProps {
    vehicles: Vehicle[];
    hoveredVehicle: string | null;
    setHoveredVehicle: (vehicleId: string | null) => void;
    isFavorite: (vehicleId: string) => boolean;
    toggleFavorite: (vehicleId: string) => void;
    handleStatusChange: (vehicleId: string, status: Vehicle['status']) => void;
    setConfirmDelete: (vehicle: Vehicle) => void;
    isDeleting: string | null;
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const VehicleGrid = ({ vehicles, ...props }: VehicleGridProps) => {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {vehicles.map((vehicle, index) => (
                <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    index={index} 
                    {...props} 
                />
            ))}
        </motion.div>
    );
};