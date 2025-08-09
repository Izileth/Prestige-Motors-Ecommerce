import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Check } from "lucide-react";

export const PasswordInput = ({
  value,
  onChange,
  onKeyDown,
  isValid,
  errorMessage,
  itemVariants,
  reduceMotion,
  focusedField,
  setFocusedField,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isValid: boolean;
  errorMessage: string;
  itemVariants: any;
  reduceMotion: boolean;
  focusedField: string | null;
  setFocusedField: (name: string | null) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
      whileTap={{ scale: reduceMotion ? 1 : 0.998 }}
    >
      <div className="relative">
        <Lock
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            focusedField === "senha" ? "text-black" : "text-black/40"
          }`}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="senha"
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField("senha")}
          onBlur={() => setFocusedField(null)}
          onKeyDown={onKeyDown}
          className={`w-full bg-transparent border-0 border-b pl-6 pr-16 py-3 md:py-4 text-black placeholder-black/40 focus:outline-none transition-all duration-300 font-light ${
            !isValid ? "border-red-500" : "border-black/20 focus:border-black"
          }`}
          placeholder="Senha (mín. 6 caracteres)"
          aria-label="Senha (mínimo 6 caracteres)"
          required
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
          whileHover={reduceMotion ? {} : { scale: 1.1 }}
          whileTap={reduceMotion ? {} : { scale: 0.9 }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </motion.button>
        {value && value.length >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <Check className="w-4 h-4 text-black" />
          </motion.div>
        )}
      </div>
      {errorMessage && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-red-500 mt-1 pl-6"
        >
          {errorMessage}
        </motion.p>
      )}
      <motion.div
        className={`absolute bottom-0 left-0 h-[1px] origin-left ${
          !isValid ? "bg-red-500" : "bg-black"
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === "senha" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
