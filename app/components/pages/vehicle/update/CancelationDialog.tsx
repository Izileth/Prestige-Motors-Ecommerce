
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";

interface CancelationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelationDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Descartar alterações?
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Você tem alterações não salvas. Tem certeza que deseja sair sem
            salvar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Continuar editando
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            Descartar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
