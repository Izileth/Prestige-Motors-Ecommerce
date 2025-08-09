import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export const ErrorMessage = ({ error }: { error: string | null }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6 border border-black/20 bg-black/5"
      >
        <div className="p-4 flex items-start">
          <AlertTriangle className="h-4 w-4 text-black mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-black/80 font-light">{error}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
