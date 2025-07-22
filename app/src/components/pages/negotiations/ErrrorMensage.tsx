import { Button } from "../../ui/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
    return (
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
        {onRetry && (
            <Button 
            variant="outline" 
            onClick={onRetry}
            className="mt-4"
            >
            Tentar novamente
            </Button>
        )}
        </div>
    );
};