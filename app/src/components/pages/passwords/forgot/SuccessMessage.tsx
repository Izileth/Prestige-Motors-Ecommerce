import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const SuccessMessage = ({
  email,
  itemVariants,
  handleTryAgain,
}: {
  email: string;
  itemVariants: any;
  handleTryAgain: () => void;
}) => (
  <motion.div>
    <motion.div variants={itemVariants} className="text-center mb-12">
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 border border-black/20 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CheckCircle className="w-8 h-8" />
      </motion.div>

      <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
        Recuperação de Senha
      </h1>
      <div className="w-20 h-[1px] bg-black mx-auto mb-4" />
      <p className="text-sm text-black/60 font-light tracking-wide">
        Instruções enviadas com sucesso
      </p>
    </motion.div>

    <motion.div variants={itemVariants} className="mb-8">
      <div className="text-center space-y-4">
        <p className="text-sm text-black/80 font-light leading-relaxed">
          Se o Email{" "}
          <span className="font-medium text-black border-b border-black/20">
            {email}
          </span>{" "}
          estiver registrado em nosso sistema, você receberá instruções de
          redefinição de senha em breve.
        </p>
        <div className="pt-4 border-t border-black/10">
          <p className="text-xs text-black/60 font-light">
            Por favor, verifique sua caixa de entrada e pasta de spam
          </p>
        </div>
      </div>
    </motion.div>

    <motion.div variants={itemVariants} className="mb-6">
      <motion.button
        onClick={handleTryAgain}
        className="group relative w-full bg-white text-black py-4 px-6 font-light tracking-wide uppercase text-sm border border-black/20 transition-all duration-300 hover:bg-black/5 overflow-hidden"
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/5"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />

        <span className="relative z-10">Tente Novamente</span>
      </motion.button>
    </motion.div>
  </motion.div>
);
