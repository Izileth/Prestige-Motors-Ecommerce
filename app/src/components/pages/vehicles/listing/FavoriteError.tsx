import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "~/src/components/ui/alert";
import { Button } from "~/src/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FavoriteError = ({
  error,
  setError,
  location,
}: {
  error: any;
  setError: (error: any) => void;
  location: any;
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 max-w-md"
    >
      <Alert variant={error.type === "auth" ? "default" : "destructive"}>
        <div className="flex justify-between items-start">
          <div>
            <AlertTitle>
              {error.type === "auth" ? "Ação requerida" : "Erro"}
            </AlertTitle>
            <AlertDescription>
              {error.message}
              {error.type === "auth" && (
                <Button
                  variant="link"
                  className="h-auto p-0 ml-2 text-inherit underline"
                  onClick={() =>
                    navigate("/login", {
                      state: { from: location.pathname },
                    })
                  }
                >
                  Fazer login
                </Button>
              )}
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setError(null)}
          >
            <X size={16} />
          </Button>
        </div>
      </Alert>
    </motion.div>
  );
};
