
import { useNavigate } from 'react-router';
import { Button } from '~/src/components/ui/button';
import { Badge } from '~/src/components/ui/badge';
import { Loader2, ChevronLeft } from 'lucide-react';

interface FormHeaderProps {
  formProgress: number;
  isSubmitting: boolean;
  onSave: () => void;
}

export const FormHeader = ({ formProgress, isSubmitting, onSave }: FormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-gray-950/95 backdrop-blur-sm shadow-none py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
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
              onClick={onSave}
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Veículo"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
