import { motion } from "framer-motion";

export const Copyright = ({ itemVariants }: { itemVariants: any }) => (
  <motion.div
    variants={itemVariants}
    className="text-center mt-8 text-xs text-black/40 font-light tracking-wide"
  >
    <div className="flex items-center justify-center space-x-4">
      <div className="w-8 h-[1px] bg-black/20" />
      <span>© {new Date().getFullYear()} Todos os direitos reservados</span>
      <div className="w-8 h-[1px] bg-black/20" />
    </div>
  </motion.div>
);
