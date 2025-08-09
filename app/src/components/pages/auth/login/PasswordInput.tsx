import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";

export const PasswordInput = ({
  password,
  setPassword,
  focusedField,
  setFocusedField,
  handleKeyDown,
}: {
  password: string;
  setPassword: (password: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      <div className="relative">
        <Lock
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            focusedField === "password" ? "text-black" : "text-black/40"
          }`}
        />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-8 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
          placeholder="Password"
          required
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </motion.button>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === "password" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
