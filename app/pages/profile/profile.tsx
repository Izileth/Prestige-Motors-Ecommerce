import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import useUserStore from "~/hooks/useUser";
import useVehicle from "~/hooks/useVehicle";
import useSale from "~/hooks/useSale";
import { motion, AnimatePresence } from "framer-motion";
import { getTotalVehicles } from '~/lib/sumstats';
import DashboardSkeleton from "~/components/layout/skeleton/dashboard";
import ProfileHeader from "~/components/pages/profile/ProfileHeader";
import StatsCards from "~/components/pages/profile/StatsCards";
import ProfileTabs from "~/components/pages/profile/ProfileTabs";
import ProfileTabContent from "~/components/pages/profile/ProfileTabContent";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Check, AlertCircle, X } from "lucide-react";
import type { UserUpdateData } from "~/types/user";
import type { Address } from "~/types/address";


import type { UserVehicleStatsResponse } from "~/types/vehicle";

export default function DashboardPage() {
  const { user, logout, isAuthenticated, status: authStatus } = useAuth();
  const {
    currentUser,
    addresses,
    loading: userLoading,
    stats: userStats,
    getUserById,
    getUserStats,
    getUserAddresses,
    updateUserData,
    createAddress,
    modifyAddress,
    removeAddress,
    uploadUserAvatar,
    removeUser,
  } = useUserStore();
  const {
    favorites,
    stats: vehicleStats,
    fetchUserFavorites,
    fetchVehicleStats,
  } = useVehicle();

  const totalVehicles = getTotalVehicles(vehicleStats);
  
  const {
    purchases,
    fetchPurchasesByUser,
  } = useSale();

  const [activeTab, setActiveTab] = useState("perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [addressFormData, setAddressFormData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
  });

  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      getUserById(user.id);
      getUserAddresses(user.id);
      fetchUserFavorites();
      fetchVehicleStats();
      fetchPurchasesByUser(user.id);
      getUserStats(user.id);
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (currentUser) {
      setEditFormData({
        nome: currentUser.nome || "",
        email: currentUser.email || "",
        telefone: currentUser.telefone || "",
        cpf: currentUser.cpf || "",
        dataNascimento: currentUser.dataNascimento ? currentUser.dataNascimento.split("T")[0] : "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const [loading, setLoading] = useState({ profile: false, password: false, delete: false });

  const handleSaveProfile = async () => {
    if (user?.id) {
      setLoading((prev) => ({ ...prev, profile: true }));
      try {
        const updateData: UserUpdateData = {};
        if (editFormData.nome && editFormData.nome.trim()) updateData.nome = editFormData.nome.trim();
        if (editFormData.email && editFormData.email.trim()) updateData.email = editFormData.email.trim();
        if (editFormData.telefone) {
          const telefoneFormatado = editFormData.telefone.replace(/\D/g, "");
          if (telefoneFormatado.length >= 10 && telefoneFormatado.length <= 11) {
            updateData.telefone = telefoneFormatado;
          } else if (telefoneFormatado === "") {
            updateData.telefone = null;
          } else {
            throw new Error("Telefone deve ter entre 10 e 11 dígitos");
          }
        }
        if (editFormData.cpf) {
          const cpfFormatado = editFormData.cpf.replace(/\D/g, "");
          if (cpfFormatado.length === 11 || cpfFormatado === "") {
            updateData.cpf = cpfFormatado || null;
          } else {
            throw new Error("CPF deve ter 11 dígitos");
          }
        }
        if (editFormData.dataNascimento) {
          const dateObj = new Date(editFormData.dataNascimento);
          if (!isNaN(dateObj.getTime())) {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            updateData.dataNascimento = `${year}-${month}-${day}`;
          }
        } else if (editFormData.dataNascimento === null) {
          updateData.dataNascimento = null;
        }
        if (Object.keys(updateData).length === 0) throw new Error("Nenhum dado para atualizar");
        await updateUserData(user.id, updateData);
        setIsEditing(false);
        setNotification({ show: true, message: "Perfil atualizado com sucesso!", type: "success" });
        if (user?.id) getUserById(user.id);
      } catch (error) {
        setNotification({ show: true, message: `Erro ao atualizar perfil: ${error instanceof Error ? error.message : "Tente novamente."}`, type: "error" });
      } finally {
        setLoading((prev) => ({ ...prev, profile: false }));
      }
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      setShowPasswordAlert(true);
      return;
    }
    if (!passwordData.senhaAtual || !passwordData.novaSenha) {
      setNotification({ show: true, message: "Senhas atuais e novas são obrigatórias", type: "error" });
      return;
    }
    setLoading((prev) => ({ ...prev, password: true }));
    try {
      if (!user?.id) throw new Error("ID do usuário não encontrado");
      const updateData: UserUpdateData = { senhaAtual: passwordData.senhaAtual, senha: passwordData.novaSenha };
      await updateUserData(user.id, updateData);
      setNotification({ show: true, message: "Senha alterada com sucesso!", type: "success" });
      setPasswordData({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setShowPasswordAlert(false);
    } catch (error) {
      let errorMessage = "Erro ao alterar senha.";
      if (error instanceof Error && error.message.includes("senha atual")) {
        errorMessage = "Senha atual incorreta. Por favor, verifique.";
      }
      setNotification({ show: true, message: errorMessage, type: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleAddAddress = async () => {
    if (user?.id) {
      if (editAddressId) {
        await modifyAddress(editAddressId, addressFormData);
      } else {
        await createAddress(user.id, addressFormData);
      }
      setAddressFormData({ cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", pais: "Brasil" });
      setEditAddressId(null);
      setShowAddressForm(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    setAddressFormData({
      cep: address.cep,
      logradouro: address.logradouro,
      numero: address.numero,
      complemento: address.complemento || "",
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado,
      pais: address.pais || "Brasil",
    });
    setEditAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    await removeAddress(addressId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadAvatar = async () => {
    if (selectedFile && user?.id) {
      await uploadUserAvatar(user.id, selectedFile);
      setSelectedFile(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation === currentUser?.email && user?.id) {
      await removeUser(user.id);
      await logout();
    }
  };

  if (authStatus === "loading" || userLoading) {
    return <DashboardSkeleton />;
  }

  const transformedUserStats = userStats as UserVehicleStatsResponse | null

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen border-none shadow-none bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md border-none shadow-none"
        >
          <Card className="border-none shadow-none bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-gray-100">Acesso Restrito</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                Você precisa estar logado para acessar esta página.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => navigate("/login")}
                className="bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                Ir para o Login
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
              <p>{notification.message}</p>
              <button
                onClick={() => setNotification({ ...notification, show: false })}
                className="ml-2 text-white dark:text-black"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <ProfileHeader currentUser={currentUser} />
        <StatsCards userStats={userStats} totalVehicles={totalVehicles} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ProfileTabContent
          activeTab={activeTab}
          currentUser={currentUser}
          isEditing={isEditing}
          editFormData={editFormData}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
          setIsEditing={setIsEditing}
          loading={loading}
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleUploadAvatar={handleUploadAvatar}
          passwordData={passwordData}
          handlePasswordChange={handlePasswordChange}
          handleSavePassword={handleSavePassword}
          showPasswordAlert={showPasswordAlert}
          deleteAccountDialog={deleteAccountDialog}
          setDeleteAccountDialog={setDeleteAccountDialog}
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          handleDeleteAccount={handleDeleteAccount}
          favorites={favorites}
          purchases={purchases}
          addresses={addresses}
          showAddressForm={showAddressForm}
          setShowAddressForm={setShowAddressForm}
          editAddressId={editAddressId}
          addressFormData={addressFormData}
          handleAddressChange={handleAddressChange}
          handleAddAddress={handleAddAddress}
          handleEditAddress={handleEditAddress}
          handleDeleteAddress={handleDeleteAddress}
          userStats={userStats}
        />
      </div>
    </div>
  );
}