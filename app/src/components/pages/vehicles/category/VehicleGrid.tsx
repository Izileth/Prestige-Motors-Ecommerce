import { motion } from "framer-motion";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import type { Vehicle } from "~/src/types/vehicle";

export const VehicleGrid = ({
  vehicles,
  favorites,
  toggleFavorite,
}: {
  vehicles: Vehicle[];
  favorites: Vehicle[];
  toggleFavorite: (vehicle: Vehicle) => void;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-4"
  >
    {vehicles.map((vehicle) => (
      <motion.div
        key={vehicle.id}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
          },
        }}
      >
        <VehicleCard
          vehicle={vehicle}
          isFavorite={favorites.some((v) => v.id === vehicle.id)}
          onToggleFavorite={toggleFavorite}
        />
      </motion.div>
    ))}
  </motion.div>
);
