import { motion, AnimatePresence } from "framer-motion";

export const PasswordStrength = ({
  password,
  passwordStrength,
}: {
  password: string;
  passwordStrength: number;
}) => {
  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  return (
    <AnimatePresence>
      {password && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-black/60 font-light">
              Força da senha
            </span>
            <span className="text-xs text-black/60 font-light">
              {getStrengthText()}
            </span>
          </div>
          <div className="h-1 bg-black/10 relative overflow-hidden">
            <motion.div
              className={`absolute left-0 top-0 h-full ${getStrengthColor()} origin-left`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: passwordStrength / 100 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
