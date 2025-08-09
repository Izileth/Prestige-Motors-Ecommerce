import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export const EmailInput = ({
  email,
  setEmail,
  focusedField,
  setFocusedField,
  handleKeyDown,
}: {
  email: string;
  setEmail: (email: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}) => (
  <div className="relative group ">
    <div className="relative  ">
      <Mail
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300  ${
          focusedField === "email" ? "text-black" : "text-black/40"
        }`}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent border-0 border-b border-black/20 pl-6 pr-0 py-4 text-black placeholder-black/40 focus:border-black focus:outline-none transition-colors duration-300 font-light "
        placeholder="Email address"
        required
      />
    </div>
    <motion.div
      className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  </div>
);
