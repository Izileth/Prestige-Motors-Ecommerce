import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { ChevronLeft, ChevronRight, Zap, ShieldCheck } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";

interface VehicleImageGalleryProps {
  vehicle: Vehicle;
}

const VehicleImageGallery: React.FC<VehicleImageGalleryProps> = ({ vehicle }) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  if (!vehicle.imagens || vehicle.imagens.length === 0) {
    return (
      <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Sem imagens disponíveis</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden bg-zinc-50 dark:bg-gray-900 aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={vehicle.imagens[activeImage].url}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {vehicle.imagens.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black shadow-sm"
                onClick={() =>
                  setActiveImage((prev) => (prev === 0 ? vehicle.imagens.length - 1 : prev - 1))
                }
              >
                <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black shadow-sm"
                onClick={() =>
                  setActiveImage((prev) => (prev === vehicle.imagens.length - 1 ? 0 : prev + 1))
                }
              >
                <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
              </Button>
            </>
          )}

          <div className="absolute bottom-3 left-3 flex gap-2">
            {vehicle.destaque && (
              <Badge
                variant="default"
                className="bg-black text-white dark:bg-white dark:text-black border-0 flex items-center gap-1 shadow-md"
              >
                <Zap size={14} /> Destaque
              </Badge>
            )}
            {vehicle.seloOriginal && (
              <Badge
                variant="secondary"
                className="bg-white text-black dark:bg-black dark:text-white flex items-center gap-1 shadow-md"
              >
                <ShieldCheck size={14} /> Original
              </Badge>
            )}
          </div>
        </div>

        {vehicle.imagens.length > 1 && (
          <div className="grid grid-cols-6 gap-2">
            {vehicle.imagens.map((img, index) => (
              <div
                key={index}
                className={`relative rounded-md overflow-hidden aspect-square cursor-pointer transition-all ${
                  activeImage === index ? "ring-2 ring-black dark:ring-white" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VehicleImageGallery;
