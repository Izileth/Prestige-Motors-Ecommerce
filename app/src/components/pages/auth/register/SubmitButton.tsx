import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const SubmitButton = ({
  isLoading,
  handleRegister,
  itemVariants,
  reduceMotion,
}: {
  isLoading: boolean;
  handleRegister: () => void;
  itemVariants: any;
  reduceMotion: boolean;
}) => (
  <motion.div variants={itemVariants} className="pt-8">
    <motion.button
      onClick={handleRegister}
      disabled={isLoading}
      className="group relative w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      whileHover={reduceMotion ? {} : { y: -1 }}
      whileTap={reduceMotion ? {} : { y: 0 }}
      aria-label="Cadastrar conta"
    >
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border border-white/30 border-t-white rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            Criando conta...
          </>
        ) : (
          <>
            Cadastrar
            <motion.div
              className="ml-2"
              animate={reduceMotion ? {} : { x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </>
        )}
      </span>
    </motion.button>
  </motion.div>
);
