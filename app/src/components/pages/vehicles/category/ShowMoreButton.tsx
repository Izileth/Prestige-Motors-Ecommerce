import { motion } from "framer-motion";
import { Button } from "~/src/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ShowMoreButton = ({ handleVehicles }: { handleVehicles: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="flex justify-center my-8"
  >
    <Button
      variant="outline"
      className="group border-gray-200 border-none rounded-none shadow-none dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 gap-2"
      onClick={handleVehicles}
    >
      <span>Ver mais veículos</span>
      <ArrowRight
        size={16}
        className="group-hover:translate-x-1 transition-transform duration-300"
      />
    </Button>
  </motion.div>
);
