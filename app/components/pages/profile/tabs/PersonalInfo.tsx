import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Edit, Camera, Key, Trash2, AlertCircle } from "lucide-react";
import type { User, UserUpdateData } from "~/types/user";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PersonalInfoProps {
  currentUser: User | null;
  isEditing: boolean;
  editFormData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: () => void;
  setIsEditing: (isEditing: boolean) => void;
  loading: { profile: boolean; password: boolean; delete: boolean };
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadAvatar: () => void;
  passwordData: any;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePassword: () => void;
  showPasswordAlert: boolean;
  deleteAccountDialog: boolean;
  setDeleteAccountDialog: (open: boolean) => void;
  deleteConfirmation: string;
  setDeleteConfirmation: (value: string) => void;
  handleDeleteAccount: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  currentUser,
  isEditing,
  editFormData,
  handleInputChange,
  handleSaveProfile,
  setIsEditing,
  loading,
  selectedFile,
  handleFileChange,
  handleUploadAvatar,
  passwordData,
  handlePasswordChange,
  handleSavePassword,
  showPasswordAlert,
  deleteAccountDialog,
  setDeleteAccountDialog,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDeleteAccount,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Informações Pessoais</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais e dados de conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-700 dark:text-gray-300">
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={editFormData.nome}
                    onChange={handleInputChange}
                    className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-700 dark:text-gray-300">
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={editFormData.telefone}
                    onChange={handleInputChange}
                    className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-gray-700 dark:text-gray-300">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={editFormData.cpf}
                    onChange={handleInputChange}
                    disabled
                    className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNascimento" className="text-gray-700 dark:text-gray-300">
                  Data de Nascimento
                </Label>
                <Input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  value={editFormData.dataNascimento}
                  onChange={handleInputChange}
                  className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">
                    Nome completo
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {currentUser?.nome || "Não informado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {currentUser?.email || "Não informado"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">
                    Telefone
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {currentUser?.telefone || "Não informado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">
                    CPF
                  </p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {currentUser?.cpf || "Oculto"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-500 mb-1">
                  Data de Nascimento
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {currentUser?.dataNascimento
                    ? format(new Date(currentUser.dataNascimento), "dd/MM/yyyy", { locale: ptBR })
                    : "Não informada"}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="mr-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={loading.profile}
                className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                {loading.profile ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Foto de Perfil</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Atualize sua foto de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Avatar className="h-32 w-32 border-4 border-gray-100 dark:border-gray-800 shadow-sm">
            <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.nome} />
            <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black text-2xl">
              {currentUser?.nome?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Label htmlFor="avatar" className="text-gray-700 dark:text-gray-300 mb-2 block">
              Selecionar nova imagem
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-gray-200 dark:border-gray-800 focus:ring-gray-900 dark:focus:ring-gray-400"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            onClick={handleUploadAvatar}
            disabled={!selectedFile}
          >
            <Camera className="w-4 h-4 mr-2" />
            Atualizar Avatar
          </Button>
        </CardFooter>
      </Card>
      

        <Card className=" max-w-full border-0 shadow-sm bg-white dark:bg-gray-900 lg:w-7xl" >
          
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
              {loading.password ? (
                <>
                  <span className="animate-spin mr-2">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Alterando...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Alterar Senha
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full border-0 shadow-sm bg-white dark:bg-gray-900" >
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
                    {loading.delete ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Excluindo...
                      </>
                    ) : (
                      "Excluir Permanentemente"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
    </div>
  );
};

export default PersonalInfo;
