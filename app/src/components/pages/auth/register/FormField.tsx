import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const FormField = ({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  onKeyDown,
  isValid = true,
  showCheck = false,
  maxLength,
  errorMessage = "",
  ariaLabel = "",
  itemVariants,
  reduceMotion,
  focusedField,
  setFocusedField,
}: {
  icon: any;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isValid?: boolean;
  showCheck?: boolean;
  maxLength?: number;
  errorMessage?: string;
  ariaLabel?: string;
  itemVariants: any;
  reduceMotion: boolean;
  focusedField: string | null;
  setFocusedField: (name: string | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusedField === name && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusedField, name]);

  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
      whileTap={{ scale: reduceMotion ? 1 : 0.998 }}
    >
      <div className="relative">
        <Icon
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            focusedField === name ? "text-black" : "text-black/40"
          }`}
        />
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => {
            setTimeout(() => {
              if (document.activeElement !== inputRef.current) {
                setFocusedField(null);
              }
            }, 100);
          }}
          onKeyDown={onKeyDown}
          className={`w-full bg-transparent border-0 border-b pl-6 pr-8 py-3 md:py-4 text-black placeholder-black/40 focus:outline-none transition-all duration-300 font-light ${
            !isValid ? "border-red-500" : "border-black/20 focus:border-black"
          }`}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          aria-label={ariaLabel || placeholder}
          aria-invalid={!isValid}
          aria-describedby={`${name}-error`}
        />
        {showCheck && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <Check className="w-4 h-4 text-black" />
          </motion.div>
        )}
        {errorMessage && (
          <motion.p
            id={`${name}-error`}
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
          animate={{ scaleX: focusedField === name ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};
