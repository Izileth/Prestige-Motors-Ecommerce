
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormAlertsProps {
  formError: string | null;
  formSuccess: string | null;
}

export function FormAlerts({ formError, formSuccess }: FormAlertsProps) {
  return (
    <AnimatePresence>
      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-600 dark:text-red-400">
              Erro
            </AlertTitle>
            <AlertDescription className="text-red-600 dark:text-red-400">
              {formError}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {formSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert className="bg-black text-white dark:bg-white dark:text-black border-0">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>{formSuccess}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
