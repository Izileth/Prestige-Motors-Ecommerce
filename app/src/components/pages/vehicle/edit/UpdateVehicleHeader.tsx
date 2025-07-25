
import { Button } from "~/src/components/ui/button";
import { Badge } from "~/src/components/ui/badge";
import { Loader2, Save, ChevronLeft } from "lucide-react";

interface UpdateVehicleHeaderProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  formProgress: number;
}

export function UpdateVehicleHeader({
  onCancel,
  onSubmit,
  isSubmitting,
  formProgress,
}: UpdateVehicleHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-gray-950/95 backdrop-blur-sm shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ChevronLeft size={16} className="mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Badge
                variant="outline"
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
              >
                Progresso: {formProgress}%
              </Badge>
            </div>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
