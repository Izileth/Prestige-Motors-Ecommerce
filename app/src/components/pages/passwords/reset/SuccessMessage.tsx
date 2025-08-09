import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const SuccessMessage = ({
  itemVariants,
  lineVariants,
}: {
  itemVariants: any;
  lineVariants: any;
}) => (
  <div className="border border-black/20 bg-white relative">
    <motion.div
      className="absolute top-0 left-0 h-[1px] bg-black"
      variants={lineVariants}
    />

    <div className="p-8 md:p-12">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 border border-black/20 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CheckCircle className="w-8 h-8" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-black mb-3 uppercase">
          Redefinir Senha
        </h1>
        <div className="w-20 h-[1px] bg-black mx-auto mb-4" />
        <p className="text-sm text-black/60 font-light tracking-wide">
          Sua senha foi atualizada com sucesso
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <div className="text-center space-y-4">
          <p className="text-sm text-black/80 font-light leading-relaxed">
            Você pode agora entrar com sua nova senha. Por razões de segurança,
            você precisará fazer login novamente.
          </p>
          <div className="pt-4 border-t border-black/10">
            <p className="text-xs text-black/60 font-light">
              Mantenha sua senha segura e não a compartilhe com ninguém
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Link to="/login">
          <motion.button
            className="group relative w-full bg-black text-white py-4 px-6 font-light tracking-wide uppercase text-sm transition-all duration-300 hover:bg-black/90 overflow-hidden"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Continue para o Login</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>

    <motion.div
      className="absolute bottom-0 right-0 h-[1px] bg-black"
      variants={lineVariants}
    />
  </div>
);
