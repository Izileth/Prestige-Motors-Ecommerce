import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import { Button } from "~/src/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/src/components/ui/alert";
import { Key, AlertCircle } from "lucide-react";
import { useAuth } from "~/src/hooks/useAuth";
import useUserStore from "~/src/hooks/useUser";
import { toast } from "sonner";
import type { UserUpdateData } from "~/src/types/user";

const ChangePassword: React.FC = () => {
  const { user } = useAuth();
  const { updateUserData } = useUserStore();
  const [passwordData, setPasswordData] = useState({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [loading, setLoading] = useState({ password: false });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = async () => {
    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      setShowPasswordAlert(true);
      return;
    }
    if (!passwordData.senhaAtual || !passwordData.novaSenha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    setLoading((prev) => ({ ...prev, password: true }));
    try {
      if (!user?.id) throw new Error("ID do usuário não encontrado");
      const updateData: UserUpdateData = {
        senhaAtual: passwordData.senhaAtual,
        senha: passwordData.novaSenha,
      };
      await updateUserData(user.id, updateData);
      toast.success("Senha atualizada com sucesso!");
      setPasswordData({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setShowPasswordAlert(false);
    } catch (error) {
      let errorMessage = "Erro ao alterar senha.";
      if (error instanceof Error && error.message.includes("senha atual")) {
        errorMessage = "Senha atual incorreta. Por favor, verifique.";
      }
      toast.error(errorMessage);
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <Card className="w-full border-0 shadow-none bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Alterar Senha</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Altere sua senha de acesso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showPasswordAlert && (
          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-600 dark:text-red-400">Erro</AlertTitle>
            <AlertDescription className="text-red-600 dark:text-red-400">
              As senhas não coincidem. Por favor, verifique.
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="senhaAtual" className="text-gray-700 dark:text-gray-300">
            Senha Atual
          </Label>
          <Input
            id="senhaAtual"
            name="senhaAtual"
            type="password"
            value={passwordData.senhaAtual}
            onChange={handlePasswordChange}
            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="novaSenha" className="text-gray-700 dark:text-gray-300">
            Nova Senha
          </Label>
          <Input
            id="novaSenha"
            name="novaSenha"
            type="password"
            value={passwordData.novaSenha}
            onChange={handlePasswordChange}
            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmarSenha" className="text-gray-700 dark:text-gray-300">
            Confirmar Nova Senha
          </Label>
          <Input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            value={passwordData.confirmarSenha}
            onChange={handlePasswordChange}
            className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
          onClick={handleSavePassword}
          disabled={!passwordData.senhaAtual || !passwordData.novaSenha || !passwordData.confirmarSenha || loading.password}
        >
          {loading.password ? "Alterando..." : <><Key className="w-4 h-4 mr-2" /> Alterar Senha</>}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
