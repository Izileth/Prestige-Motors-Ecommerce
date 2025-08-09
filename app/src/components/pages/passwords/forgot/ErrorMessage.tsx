import { motion, AnimatePresence } from "framer-motion";

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
          <div className="w-4 h-4 border border-black/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <div className="w-1 h-1 bg-black/60" />
          </div>
          <p className="text-sm text-black/80 font-light">{error}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
