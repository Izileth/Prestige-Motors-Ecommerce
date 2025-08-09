import { motion } from "framer-motion";
import { Checkbox } from "~/src/components/ui/check-box";
import { Link } from "react-router";

export const RememberMe = ({
  rememberMe,
  setRememberMe,
}: {
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between text-sm">
    <motion.label
      className="flex items-center cursor-pointer group"
      whileHover={{ x: 2 }}
    >
      <Checkbox
        checked={rememberMe}
        onCheckedChange={(checked) => {
          if (checked === "indeterminate") {
          } else {
            setRememberMe(checked);
          }
        }}
        className="mr-2 border-black/20 data-[state=checked]:bg-black data-[state=checked]:border-black"
      />
      <span className="text-black/60 font-light group-hover:text-black transition-colors duration-300">
        Remember me
      </span>
    </motion.label>

    <motion.div whileHover={{ x: 2 }}>
      <Link
        to="/passwords/forgots"
        className="text-black/60 font-light hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black/20"
      >
        Esqueceu a Senha?
      </Link>
    </motion.div>
  </div>
);
