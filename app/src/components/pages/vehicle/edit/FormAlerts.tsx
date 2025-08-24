
import { AnimatePresence } from "framer-motion";;
import { toast } from "sonner";

interface FormAlertsProps {
  formError: string | null;
  formSuccess: string | null;
}

export function FormAlerts({ formError, formSuccess }: FormAlertsProps) {
  return (
    <AnimatePresence>
      {formError && (
        toast.error(formError)
      )}

      {formSuccess && (
        toast.success(formSuccess)
      )}
    </AnimatePresence>
  );
}
