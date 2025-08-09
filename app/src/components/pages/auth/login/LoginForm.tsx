import { motion } from "framer-motion";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { RememberMe } from "./RememberMe";
import { SubmitButton } from "./SubmitButton";
import { SignUpLink } from "./SignUpLink";

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  focusedField,
  setFocusedField,
  isLoading,
  handleLogin,
  handleKeyDown,
  itemVariants,
}: any) => (
  <motion.div variants={itemVariants} className="space-y-8">
    <EmailInput
      email={email}
      setEmail={setEmail}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      handleKeyDown={handleKeyDown}
    />
    <PasswordInput
      password={password}
      setPassword={setPassword}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      handleKeyDown={handleKeyDown}
    />
    <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} />
    <SubmitButton isLoading={isLoading} handleLogin={handleLogin} itemVariants={itemVariants} />
    <SignUpLink itemVariants={itemVariants} />
  </motion.div>
);
