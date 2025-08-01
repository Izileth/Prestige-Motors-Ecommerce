import { useEffect, useRef } from "react";
import { useFeaturedVehicles } from "~/src/hooks/useFeaturedVehicles";
import { VehicleCard } from "../../common/VehiclesCard";
import { VehicleCardSkeleton } from "~/src/components/layout/skeleton/VehicleCardSkeleton";
import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
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

  // Só atualiza o ref uma vez quando os veículos são carregados
  useEffect(() => {
    if (!hasInitialLoad.current && featuredVehicles.length > 0) {
      hasInitialLoad.current = true;
    }
  }, [featuredVehicles.length]);

  return (
    <section className="py-12  max-w-full mx-auto px-4 sm:px-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-light">{title}</h2>
          {subtitle && (
            <p className="text-neutral-600 font-extralight dark:text-neutral-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {showRefresh && (
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => refresh()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}
            Atualizar
          </Button>
        )}
      </div>

      {/* Listagem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-full">
        {loading && !hasInitialLoad.current
          ? Array.from({ length: itemCount }).map((_, index) => (
              <VehicleCardSkeleton key={`skeleton-${index}`} />
            ))
          : featuredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
              
            ))}
      </div>
     
    </section>
  );
};
