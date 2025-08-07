import { useUserStore } from '../store/slices/user';
import type { UserUpdateData } from '../types/user';
import type { AddressData, Address } from '~/src/types/address';
import type { User } from '../types/user';
import type { UserStats } from '../types/user';
interface UseUserStoreReturn {
    // Estado
    currentUser: User | null;
    users: User[];
    addresses: Address[];
    stats: UserStats | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    
    // Ações
    getUserById: (id: string) => Promise<void>;
    updateUserData: (id: string, userData: UserUpdateData) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
    getUserStats: (id: string) => Promise<void>;
    getUserAddresses: (userId: string) => Promise<void>;
    createAddress: (userId: string, addressData: AddressData) => Promise<void>;
    modifyAddress: (addressId: string, addressData: AddressData) => Promise<void>;
    removeAddress: (addressId: string) => Promise<void>;
    uploadUserAvatar: (userId: string, file: File) => Promise<void>;
    resetUserStore: () => void;
    
    // Estado computado
    hasAddresses: boolean;
    isAuthenticated: boolean;
}

const useUserStoreHook = (): UseUserStoreReturn => {
    const {
        // Estado
        currentUser,
        users,
        addresses,
        stats,
        loading,
        error,
        success,
        
        // Ações originais
        fetchUserById,
        updateUser,
        deleteUser,
        fetchUserStats,
        fetchUserAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        uploadAvatar,
        resetUserState
    } = useUserStore();
    
    // Estado computado
    const hasAddresses = addresses.length > 0;
    const isAuthenticated = !!currentUser;
    
    return {
        // Estado
        currentUser,
        users,
        addresses,
        stats,
        loading,
        error,
        success,
        
        // Ações com nomes mantidos para compatibilidade
        getUserById: fetchUserById,
        updateUserData: updateUser,
        removeUser: deleteUser,
        getUserStats: fetchUserStats,
        getUserAddresses: fetchUserAddresses,
        createAddress: addAddress,
        modifyAddress: updateAddress,
        removeAddress: deleteAddress,
        uploadUserAvatar: uploadAvatar,
        resetUserStore: resetUserState,
        
        // Estado computado
        hasAddresses,
        isAuthenticated
    };
};

export default useUserStoreHook;