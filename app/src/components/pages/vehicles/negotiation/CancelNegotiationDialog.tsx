import { Button } from "~/src/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/src/components/ui/alert-dialog";

export const CancelNegotiationDialog = ({ handleCancel, isProcessing }: any) => (
  <div className="bg-white p-6 rounded-md border border-gray-200">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Ações do Comprador</h3>
        <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
          Ativo
        </span>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
            disabled={isProcessing}
          >
            Cancelar Negociação
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white border border-gray-200 rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Cancelar Negociação
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              Tem certeza que deseja cancelar esta negociação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Não, manter
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              Sim, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
);
