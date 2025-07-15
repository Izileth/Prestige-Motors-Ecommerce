import { Button } from "~/src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/src/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import type { Vehicle } from "~/src/types/vehicle"; // Ajuste o caminho conforme necessário

interface DeleteConfirmationDialogProps {
    vehicle: Vehicle | null;
    onConfirm: (vehicleId: string) => void;
    onCancel: () => void;
    isDeleting: boolean;
}

export const DeleteConfirmationDialog = ({
    vehicle,
    onConfirm,
    onCancel,
    isDeleting
}: DeleteConfirmationDialogProps) => {
    return (
        <Dialog open={!!vehicle} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">Confirmar exclusão</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Tem certeza que deseja excluir o veículo{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {vehicle?.marca} {vehicle?.modelo}
                        </span>
                        ? Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => vehicle && onConfirm(vehicle.id)}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white border-0"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Excluindo...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir veículo
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};