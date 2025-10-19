import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRandomVehicles } from "~/src/hooks/useRandomVehicle";
import { VehicleCard } from "~/src/components/common/VehiclesCard";
import { Skeleton } from "~/src/components/ui/skeleton";

export function RandomVehicles() {
  const { vehicles, loading, refresh } = useRandomVehicles(12);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });



  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300 w-full px-0 sm:px-4">
      <div className="container max-w-full mx-auto px-4" ref={containerRef}>
        {/* Conteúdo */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full bg-gray-100 dark:bg-gray-900" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-gray-100 dark:bg-gray-900" />
                    <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-900" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.05,
                      },
                    },
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </motion.div>
            
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
