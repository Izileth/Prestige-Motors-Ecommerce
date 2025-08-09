import { motion } from "framer-motion";
import { PasswordInput } from "./PasswordInput";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { SubmitButton } from "./SubmitButton";
import { BackToLoginLink } from "./BackToLoginLink";

export const ResetForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  focusedField,
  setFocusedField,
  passwordStrength,
  handleKeyDown,
  isLoading,
  handleReset,
  token,
  itemVariants,
}: any) => (
  <motion.div variants={itemVariants} className="space-y-6 mb-8">
    <PasswordInput
      password={password}
      setPassword={setPassword}
      setError={setError}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      handleKeyDown={handleKeyDown}
      passwordStrength={passwordStrength}
    />
    <ConfirmPasswordInput
      password={password}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      setError={setError}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      handleKeyDown={handleKeyDown}
    />
    <SubmitButton
      isLoading={isLoading}
      password={password}
      confirmPassword={confirmPassword}
      token={token}
      handleReset={handleReset}
    />
    <BackToLoginLink />
  </motion.div>
);
