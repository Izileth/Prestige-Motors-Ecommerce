import { motion } from "framer-motion";
import { Link } from "react-router";

export const SignUpLink = ({ itemVariants }: { itemVariants: any }) => (
  <motion.div
    variants={itemVariants}
    className="text-center pt-6 border-t border-black/10"
  >
    <p className="text-sm text-black/60 font-light">
      Ainda Não Tem uma Conta?{" "}
      <motion.span whileHover={{ x: 2 }} className="inline-block">
        <Link
          to="/register"
          className="text-black font-light border-b border-transparent hover:border-black/20 transition-colors duration-300"
        >
          Cadastre-se
        </Link>
      </motion.span>
    </p>
  </motion.div>
);
