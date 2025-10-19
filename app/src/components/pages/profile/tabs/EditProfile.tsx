import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "~/src/components/ui/card";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import { Button } from "~/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/src/components/ui/avatar";
import { Edit, Camera } from "lucide-react";
import type { User } from "~/src/types/user";
import { useAuth } from "~/src/hooks/useAuth";

const EditProfile: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ nome: '', email: '', telefone: '', cpf: '', dataNascimento: '' });
  const [loading, setLoading] = useState({ profile: false });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (currentUser) {
      setEditFormData({
        nome: currentUser.nome || '',
        email: currentUser.email || '',
        telefone: currentUser.telefone || '',
        cpf: currentUser.cpf || '',
        dataNascimento: currentUser.dataNascimento ? new Date(currentUser.dataNascimento).toISOString().split('T')[0] : '',
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Lógica para salvar o perfil
    console.log('Saving profile...', editFormData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadAvatar = () => {
    // Lógica para upload do avatar
    console.log('Uploading avatar...', selectedFile);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 border-0 shadow-none bg-white dark:bg-gray-900">
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
                    {currentUser?.cpf || "Não Informado"}
                  </p>
                </div>
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
                {loading.profile ? "Salvando..." : "Salvar Alterações"}
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

      <Card className="border-0 shadow-none bg-white dark:bg-gray-900">
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
    </div>
  );
};

export default EditProfile;
