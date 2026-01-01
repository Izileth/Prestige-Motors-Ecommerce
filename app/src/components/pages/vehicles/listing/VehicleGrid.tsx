import { motion } from "framer-motion";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import type { Vehicle } from "~/src/types/vehicle";

export const VehicleGrid = ({
  vehicles,
  isFavorite,
  toggleFavorite,
}: {
  vehicles: Vehicle[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (vehicle: Vehicle) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-6 mb-8 px-2 sm:px-4"
  >
    {vehicles.map((vehicle, index) => (
      <VehicleCard
        key={vehicle.id}
        vehicle={vehicle}
        isFavorite={isFavorite(vehicle.id)}
        onToggleFavorite={toggleFavorite}
        index={index}
      />
    ))}
  </motion.div>
);
