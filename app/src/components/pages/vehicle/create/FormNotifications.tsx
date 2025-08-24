import { AnimatePresence } from "framer-motion"
import { toast } from "sonner";

interface FormNotificationsProps {
    formError: string | null;
    formSuccess: string | null;
}

export const FormNotifications = ({ formError, formSuccess }: FormNotificationsProps) => (
    <AnimatePresence>
        {formError && (
            toast.error(formError)
        )}

        {formSuccess && (
            toast.success(formSuccess)
        )}
    </AnimatePresence>
);