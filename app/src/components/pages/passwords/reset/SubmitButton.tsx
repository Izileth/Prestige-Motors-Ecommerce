import { motion } from "framer-motion";

export const SubmitButton = ({
  isLoading,
  password,
  confirmPassword,
  token,
  handleReset,
}: {
  isLoading: boolean;
  password: string;
  confirmPassword: string;
  token: string | null;
  handleReset: () => void;
}) => (
  <motion.div className="mb-6">
    <motion.button
      onClick={handleReset}
      disabled={
        isLoading ||
        !password ||
        !confirmPassword ||
        password !== confirmPassword ||
        !token
      }
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
            Atualizando Senha...
          </>
        ) : (
          "Redefinir Senha"
        )}
      </span>
    </motion.button>
  </motion.div>
);
