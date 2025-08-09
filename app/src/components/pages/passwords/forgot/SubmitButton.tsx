import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const SubmitButton = ({
  isLoading,
  email,
  handleRecover,
  itemVariants,
}: {
  isLoading: boolean;
  email: string;
  handleRecover: () => void;
  itemVariants: any;
}) => (
  <motion.div variants={itemVariants} className="mb-8">
    <motion.button
      onClick={handleRecover}
      disabled={isLoading || !email}
      className="group relative w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm transition-all duration-300 hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />

      <span className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border border-white/30 border-t-white rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            Enviando...
          </>
        ) : (
          <>
            Enviar Instruções
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              <Send className="w-4 h-4" />
            </motion.div>
          </>
        )}
      </span>
    </motion.button>
  </motion.div>
);
