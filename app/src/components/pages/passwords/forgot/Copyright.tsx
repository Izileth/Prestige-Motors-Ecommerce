import { motion } from "framer-motion";

export const Copyright = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-black/40 font-light tracking-wide"
  >
    <div className="flex items-center justify-center space-x-4">
      <div className="w-8 h-[1px] bg-black/20" />
      <span>© {new Date().getFullYear()} Todos os direitos reservados</span>
      <div className="w-8 h-[1px] bg-black/20" />
    </div>
  </motion.div>
);
