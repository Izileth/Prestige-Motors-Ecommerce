import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/src/components/ui/card";
import { Button } from "~/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/src/components/ui/avatar";
import { Edit, Key, Trash2 } from "lucide-react";
import type { User } from "~/src/types/user";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

interface PersonalInfoProps {
  currentUser: User | null;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ currentUser }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-zinc-100">
      <Card className="lg:col-span-2 border-0 shadow-none bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Informações Pessoais</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais e dados de conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  {currentUser?.cpf || "Não Informado"}
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
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Foto de Perfil</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Visualize sua foto de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Avatar className="h-32 w-32 border-4 border-gray-100 dark:border-gray-800 shadow-sm">
            <AvatarImage src={currentUser?.avatar || ""} alt={currentUser?.nome} />
            <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black text-2xl">
              {currentUser?.nome?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>

      <Card className="w-full border-0 shadow-none bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Ações da Conta</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Gerencie sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 gap-2 flex flex-col md:flex-row  md:space-y-0">
          <Link to="/dashboard/edit-profile">
            <Button className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100">
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </Link>
          <Link to="/dashboard/change-password">
            <Button className="w-full bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100">
              <Key className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </Link>
          <Link to="/dashboard/delete-account">
            <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white border-0">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;
