import type React from "react";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Expand, X } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle";

interface VehicleImageGalleryProps {
  vehicle: Vehicle;
}

const VehicleImageGallery: React.FC<VehicleImageGalleryProps> = ({ vehicle }) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const constraintsRef = useRef(null);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-100, 0, 100], [1, 0, -1]);

  if (!vehicle.imagens || vehicle.imagens.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-[16/9] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700"
      >
        <motion.span 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-gray-500 dark:text-gray-400 font-medium"
        >
          Sem imagens disponíveis
        </motion.span>
      </motion.div>
    );
  }

  const handleDragEnd = useCallback((event: any, info: any) => {
    const threshold = 50;
    const swipeVelocity = Math.abs(info.velocity.x);
    const swipeDistance = Math.abs(info.offset.x);
    
    if (swipeDistance > threshold || swipeVelocity > 500) {
      if (info.offset.x > 0) {
        // Swipe right - previous image
        setActiveImage((prev) => (prev === 0 ? vehicle.imagens.length - 1 : prev - 1));
      } else {
        // Swipe left - next image
        setActiveImage((prev) => (prev === vehicle.imagens.length - 1 ? 0 : prev + 1));
      }
    }
    
    setIsDragging(false);
    dragX.set(0);
  }, [vehicle.imagens.length, dragX]);

  const nextImage = () => {
    setActiveImage((prev) => (prev === vehicle.imagens.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? vehicle.imagens.length - 1 : prev - 1));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="space-y-6">
          <div 
            ref={constraintsRef}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-gray-900 dark:to-gray-800 aspect-[16/9] shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className="relative w-full h-full cursor-pointer overflow-hidden"
                onClick={() => setIsFullscreen(true)}
              >
                <motion.img
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  drag={vehicle.imagens.length > 1 ? "x" : false}
                  dragConstraints={{ left: -100, right: 100 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{ x: dragX }}
                  src={vehicle.imagens[activeImage].url}
                  alt={`${vehicle.marca} ${vehicle.modelo}`}
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Zoom indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 text-white"
                >
                  <Expand size={16} />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {vehicle.imagens.length > 1 && !isDragging && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-lg backdrop-blur-sm border border-white/20 dark:border-black/20 transition-all duration-300 hover:scale-110"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black shadow-lg backdrop-blur-sm border border-white/20 dark:border-black/20 transition-all duration-300 hover:scale-110"
                    onClick={nextImage}
                  >
                    <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
                  </Button>
                </motion.div>
              </>
            )}

            {/* Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4 flex gap-2"
            >
              {vehicle.destaque && (
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-zinc-50 to-zinc-300 text-black border-0 flex items-center gap-1.5 shadow-lg backdrop-blur-sm px-3 py-1.5 font-medium"
                >
                  <Zap size={14} /> Destaque
                </Badge>
              )}
              {vehicle.seloOriginal && (
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-black dark:bg-black/90 dark:text-white flex items-center gap-1.5 shadow-lg backdrop-blur-sm border border-white/20 dark:border-black/20 px-3 py-1.5 font-medium"
                >
                  <ShieldCheck size={14} /> Original
                </Badge>
              )}
            </motion.div>

            {/* Progress dots */}
            {vehicle.imagens.length > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-4 right-4 flex gap-1.5"
              >
                {vehicle.imagens.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeImage === index 
                        ? "bg-white shadow-lg scale-125" 
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    onClick={() => setActiveImage(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Thumbnail grid */}
          {vehicle.imagens.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-6 gap-3"
            >
              {vehicle.imagens.map((img, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-300 ${
                    activeImage === index 
                      ? "ring-2 ring-zinc-200 dark:ring-zinc-300 shadow-lg scale-105" 
                      : "opacity-60 hover:opacity-90 hover:scale-105"
                  }`}
                  onClick={() => setActiveImage(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={img.url || "/placeholder.svg"} 
                    alt="" 
                    className="w-full h-full object-cover" 
                  />
                  {activeImage === index && (
                    <motion.div 
                      layoutId="active-thumb"
                      className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={vehicle.imagens[activeImage].url}
                alt={`${vehicle.marca} ${vehicle.modelo}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsFullscreen(false)}
              >
                <X size={24} />
              </Button>

              {vehicle.imagens.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={24} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight size={24} />
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VehicleImageGallery;