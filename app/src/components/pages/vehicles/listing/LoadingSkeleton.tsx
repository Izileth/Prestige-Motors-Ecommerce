import { motion } from "framer-motion";
import { VehicleCardSkeleton } from "~/src/components/layout/skeleton/VehicleCardSkeleton";

export const LoadingSkeleton = () => (
  <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full p-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <VehicleCardSkeleton />
      </motion.div>
    ))}
  </div>
);
