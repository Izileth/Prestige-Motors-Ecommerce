import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export const ResetHeader = ({ itemVariants }: { itemVariants: any }) => (
  <motion.div variants={itemVariants} className="text-center mb-12">
    <motion.div
      className="inline-flex items-center justify-center w-12 h-12 border border-black/20 mb-6"
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
    >
      <Shield className="w-5 h-5" />
    </motion.div>

    <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
      Redefinição de Senha
    </h1>
    <div className="w-16 h-[1px] bg-black mx-auto mb-4" />
    <p className="text-sm text-black/60 font-light tracking-wide">
      Crie sua nova senha segura
    </p>
  </motion.div>
);
