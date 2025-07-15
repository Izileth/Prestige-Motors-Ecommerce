import type React from "react";
import { TabsContent, Tabs } from "~/src/components/ui/tabs";
import PersonalInfo from "./tabs/PersonalInfo";
import FavoriteVehicles from "./tabs/FavoriteVehicles";
import PurchaseHistory from "./tabs/PurchaseHistory";
import AddressManager from "./tabs/AddressManager";
import Statistics from "./tabs/Statistics";
import type { User, UserUpdateData } from "~/src/types/user";
import type { Vehicle } from "~/src/types/vehicle";
import type { Sale } from "~/src/types/sale";
import type { Address } from "~/src/types/address";
import type { UserStats } from "~/src/types/user";
interface ProfileTabContentProps {
  activeTab: string;
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
  favorites: Vehicle[];
  purchases: Sale[];
  addresses: Address[];
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  editAddressId: string | null;
  addressFormData: any;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAddAddress: () => void;
  handleEditAddress: (address: Address) => void;
  handleDeleteAddress: (addressId: string) => void;
  userStats: UserStats | null;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  activeTab,
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
  favorites,
  purchases,
  addresses,
  showAddressForm,
  setShowAddressForm,
  editAddressId,
  addressFormData,
  handleAddressChange,
  handleAddAddress,
  handleEditAddress,
  handleDeleteAddress,
  userStats,
}) => {
  return (
    <Tabs value={activeTab} className="w-full mb-10">
      <TabsContent value="perfil">
        <PersonalInfo
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
        />
      </TabsContent>
      <TabsContent value="veiculos">
        <FavoriteVehicles favorites={favorites} />
      </TabsContent>
      <TabsContent value="compras">
        <PurchaseHistory purchases={purchases} />
      </TabsContent>
      <TabsContent value="enderecos">
        <AddressManager
          addresses={addresses}
          showAddressForm={showAddressForm}
          setShowAddressForm={setShowAddressForm}
          editAddressId={editAddressId}
          addressFormData={addressFormData}
          handleAddressChange={handleAddressChange}
          handleAddAddress={handleAddAddress}
          handleEditAddress={handleEditAddress}
          handleDeleteAddress={handleDeleteAddress}
        />
      </TabsContent>
      <TabsContent value="estatisticas">
        <Statistics userStats={userStats} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabContent;