import { motion } from "framer-motion";
import { Link } from "react-router";

export const SignInLink = ({
  itemVariants,
  reduceMotion,
}: {
  itemVariants: any;
  reduceMotion: boolean;
}) => (
  <motion.div
    variants={itemVariants}
    className="text-center pt-6 border-t border-black/10"
  >
    <p className="text-sm text-black/60 font-light">
      Já tem uma conta?{" "}
      <motion.span
        whileHover={reduceMotion ? {} : { x: 2 }}
        className="inline-block"
      >
        <Link
          to="/login"
          className="text-black font-light border-b border-transparent hover:border-black/20 transition-colors duration-300"
        >
          Fazer login
        </Link>
      </motion.span>
    </p>
  </motion.div>
);
