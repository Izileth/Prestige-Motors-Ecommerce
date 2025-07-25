import type React from "react";
import { motion } from "framer-motion";
import { Car, ArrowRight } from "lucide-react";
import { Badge } from "~/src/components/ui/badge";
import { useVehicleRecommendations } from "~/src/hooks/useRadomVehicles";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import type { Vehicle } from "~/src/types/vehicle";

interface VehicleRecommendationsGridProps {
  currentVehicle: Vehicle | null;
  onVehicleClick?: (vehicle: Vehicle) => void;
  className?: string;
}

const VehicleRecommendationsGrid: React.FC<VehicleRecommendationsGridProps> = ({
  currentVehicle,
  onVehicleClick,
  className = "",
}) => {
  const { recommendations, hasRecommendations, stats } =
    useVehicleRecommendations(currentVehicle, {
      limit: 6,
      minScore: 0.15,
    });

  if (!hasRecommendations) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center ${className}`}
      >
        <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          Nenhuma recomendação encontrada
        </h3>
        <p className="text-sm text-gray-500">
          Não encontramos veículos similares no momento.
        </p>
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
    >
      {/* Header da seção */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            Recomendações para você
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 dark:text-gray-400 mt-1"
          >
            Baseado nas características de {currentVehicle?.marca}{" "}
            {currentVehicle?.modelo}
          </motion.p>
        </div>

        {/* Stats badge */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="px-3 py-1.5 text-xs font-medium"
            >
              {recommendations.length} sugestões •{" "}
              {(stats.averageScore * 100).toFixed(0)}% compatibilidade
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Grid de recomendações usando VehicleCard */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {recommendations.map((vehicle, index) => (
          <div
            key={vehicle.id}
            onClick={() => onVehicleClick?.(vehicle)}
            className="cursor-pointer"
          >
            <VehicleCard vehicle={vehicle} index={index} />
          </div>
        ))}
      </motion.div>

      {/* Call to action 
      {recommendations.length >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
          >
            Ver Mais Recomendações
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      )}
      */}
    </motion.div>
  );
};

export default VehicleRecommendationsGrid;
