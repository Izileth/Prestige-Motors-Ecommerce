import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export const BackToLoginLink = ({ itemVariants }: { itemVariants: any }) => (
  <motion.div variants={itemVariants} className="text-center">
    <motion.div whileHover={{ x: -2 }}>
      <Link
        to="/login"
        className="inline-flex items-center text-sm text-black/60 font-light hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Login
      </Link>
    </motion.div>
  </motion.div>
);
