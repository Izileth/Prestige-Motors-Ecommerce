import { motion } from "framer-motion";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle } from "~/src/types/vehicle"; // Ajuste o caminho conforme sua estrutura

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
    vehicleUpdates: Record<string, string>;
    statusUpdating: Record<string, boolean>; 
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-0"
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