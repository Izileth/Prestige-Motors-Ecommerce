import { motion } from "framer-motion";
import { EmailInput } from "./EmailInput";
import { SubmitButton } from "./SubmitButton";
import { BackToLoginLink } from "./BackToLoginLink";

export const ForgotForm = ({
  email,
  setEmail,
  error,
  setError,
  focusedField,
  setFocusedField,
  isLoading,
  handleRecover,
  handleKeyDown,
  itemVariants,
}: any) => (
  <motion.div>
    <EmailInput
      email={email}
      setEmail={setEmail}
      setError={setError}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      handleKeyDown={handleKeyDown}
      itemVariants={itemVariants}
    />
    <SubmitButton
      isLoading={isLoading}
      email={email}
      handleRecover={handleRecover}
      itemVariants={itemVariants}
    />
    <BackToLoginLink itemVariants={itemVariants} />
  </motion.div>
);
