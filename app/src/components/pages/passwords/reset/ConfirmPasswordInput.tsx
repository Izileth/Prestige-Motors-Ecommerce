import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

export const ConfirmPasswordInput = ({
  password,
  confirmPassword,
  setConfirmPassword,
  setError,
  focusedField,
  setFocusedField,
  handleKeyDown,
}: {
  password: string;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  setError: (error: string | null) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative group">
      <div className="relative">
        <Lock
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            focusedField === "confirmPassword" ? "text-black" : "text-black/40"
          }`}
        />
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError(null);
          }}
          onFocus={() => setFocusedField("confirmPassword")}
          onBlur={() => setFocusedField(null)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-8 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light"
          placeholder="Confirm new password"
          required
          minLength={6}
        />
        <motion.button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showConfirmPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </motion.button>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focusedField === "confirmPassword" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence>
        {confirmPassword && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  password === confirmPassword ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs text-black/60 font-light">
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords don't match"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
