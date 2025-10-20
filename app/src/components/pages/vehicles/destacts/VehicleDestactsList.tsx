import { useEffect, useRef } from "react";
import { useFeaturedVehicles } from "~/src/hooks/useFeaturedVehicles";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import { VehicleCardSkeleton } from "~/src/components/layout/skeleton/VehicleCardSkeleton";
import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { RefreshCw } from "lucide-react";

interface VehicleListingProps {
  title?: string;
  subtitle?: string;
  showRefresh?: boolean;
  itemCount?: number;
}

export const VehiclesDestactsListing = ({
  title = "Veículos em Destaque",
  subtitle = "Descubra nossa seleção premium",
  showRefresh = true,
  itemCount = 12,
}: VehicleListingProps) => {
  const { featuredVehicles, loading, refresh } = useFeaturedVehicles(itemCount);
  const hasInitialLoad = useRef(false);


  useEffect(() => {
    if (!hasInitialLoad.current && featuredVehicles.length > 0) {
      hasInitialLoad.current = true;
    }
  }, [featuredVehicles.length]);

  return (
    <section className="py-12 max-w-full mx-auto px-0 sm:px-4">
      {/* Listagem */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-0 px-0 sm:px-4 gap-1 sm:gap-4 w-full max-w-full">
        {loading && !hasInitialLoad.current
          ? Array.from({ length: itemCount }).map((_, index) => (
              <VehicleCardSkeleton key={`skeleton-${index}`} />
            ))
          : featuredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-0 px-0"
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
              
            ))}
      </div>
     
    </section>
  );
};
