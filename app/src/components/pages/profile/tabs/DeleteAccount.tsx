import type React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/src/components/ui/dialog";
import { Input } from "~/src/components/ui/input";
import { Trash2 } from "lucide-react";
import type { User } from "~/src/types/user";

import { useAuth } from "~/src/hooks/useAuth";

interface DeleteAccountProps {
  deleteAccountDialog: boolean;
  setDeleteAccountDialog: (open: boolean) => void;
  deleteConfirmation: string;
  setDeleteConfirmation: (value: string) => void;
  handleDeleteAccount: () => void;
  loading: { delete: boolean };
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  deleteAccountDialog,
  setDeleteAccountDialog,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteAccount,
  loading,
}) => {
  const { user: currentUser } = useAuth();
  return (
    <Card className="w-full border-0 shadow-none bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-red-600 dark:text-red-400">Excluir Conta</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Esta ação é irreversível. Todos os seus dados serão removidos permanentemente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Ao excluir sua conta, você perderá acesso a todos os veículos favoritados, histórico de compras e
          informações pessoais.
        </p>
        <Dialog open={deleteAccountDialog} onOpenChange={setDeleteAccountDialog}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full bg-red-600 hover:bg-red-700 text-white border-0"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Minha Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 border-0 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Você tem certeza?</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados
                dos nossos servidores.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                Para confirmar, digite seu email:{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {currentUser?.email}
                </span>
              </p>
              <Input
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Digite seu email"
                className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteAccountDialog(false)}
                className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== currentUser?.email || loading.delete}
                className="bg-red-600 hover:bg-red-700 text-white border-0"
              >
                {loading.delete ? "Excluindo..." : "Excluir Permanentemente"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;
