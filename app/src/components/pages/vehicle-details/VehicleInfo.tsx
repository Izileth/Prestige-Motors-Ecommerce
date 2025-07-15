import type React from "react";
import { motion } from "framer-motion";
import { Calendar, Gauge, Fuel, Cog } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";
import { getFuelType, getTransmissionType } from "~/src/utils/vehicle";

interface VehicleInfoProps {
  vehicle: Vehicle;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ vehicle }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-2">
        {vehicle.marca} {vehicle.modelo}
      </h1>
      <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>
            {vehicle.anoFabricacao}/{vehicle.anoModelo}
          </span>
        </div>
        <span className="text-gray-300 dark:text-gray-700">•</span>
        <div className="flex items-center gap-1">
          <Gauge size={16} />
          <span>{vehicle?.quilometragem?.toLocaleString("pt-BR")} km</span>
        </div>
        <span className="text-gray-300 dark:text-gray-700">•</span>
        <div className="flex items-center gap-1">
          <Fuel size={16} />
          <span>{getFuelType(vehicle.tipoCombustivel)}</span>
        </div>
        <span className="text-gray-300 dark:text-gray-700">•</span>
        <div className="flex items-center gap-1">
          <Cog size={16} />
          <span>{getTransmissionType(vehicle.cambio)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleInfo;
