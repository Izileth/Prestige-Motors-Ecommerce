import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as userService from '~/src/services/user';
import type { User, UserUpdateData, UserStats } from '~/src/types/user';
import type { AddressData , Address} from '~/src/types/address';

interface UserStoreState {
    currentUser: User | null;
    users: User[];
    addresses: Address[];
    stats: UserStats | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

interface UserStoreActions {
    fetchUserById: (id: string) => Promise<void>;
    updateUser: (id: string, userData: UserUpdateData) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    fetchUserStats: (id: string) => Promise<void>;
    fetchUserAddresses: (userId: string) => Promise<void>;
    addAddress: (userId: string, addressData: AddressData) => Promise<void>;
    updateAddress: (addressId: string, addressData: AddressData) => Promise<void>;
    deleteAddress: (addressId: string) => Promise<void>;
    uploadAvatar: (userId: string, file: File) => Promise<void>;
    resetUserState: () => void;
}

const initialState: UserStoreState = {
    currentUser: null,
    users: [],
    addresses: [],
    stats: null,
    loading: false,
    error: null,
    success: false,
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            // ✅ Buscar usuário por ID
            fetchUserById: async (id: string) => {
                set({ loading: true, error: null });
                try {
                    const user = await userService.userService.getUserById(id);
                    set({ currentUser: user, loading: false });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to fetch user' 
                    });
                    throw error;
                }
            },

            // ✅ Atualizar usuário
            updateUser: async (id: string, userData: UserUpdateData) => {
                set({ loading: true, error: null, success: false });
                try {
                    const updatedUser = await userService.userService.updateUser(id, userData);
                    set({ 
                        currentUser: updatedUser,
                        users: get().users.map(user => 
                            user.id === id ? updatedUser : user
                        ),
                        loading: false,
                        success: true
                    });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to update user' 
                    });
                    throw error;
                }
            },

            // ✅ Deletar usuário
            deleteUser: async (id: string) => {
                set({ loading: true, error: null, success: false });
                try {
                    await userService.userService.deleteUser(id);
                    set({ 
                        currentUser: null,
                        users: get().users.filter(user => user.id !== id),
                        loading: false,
                        success: true
                    });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to delete user' 
                    });
                    throw error;
                }
            },

            // ✅ Buscar estatísticas do usuário
            fetchUserStats: async (id: string) => {
                set({ loading: true, error: null });
                try {
                    const stats = await userService.userService.getUserStats(id);
                    set({ stats, loading: false });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to fetch user stats' 
                    });
                    throw error;
                }
            },

            // ✅ Buscar endereços do usuário
            fetchUserAddresses: async (userId: string) => {
                set({ loading: true, error: null });
                try {
                    const addresses = await userService.userService.getUserAddresses(userId);
                    set({ addresses, loading: false });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to fetch addresses' 
                    });
                    throw error;
                }
            },

            // ✅ Adicionar endereço
            addAddress: async (userId: string, addressData: AddressData) => {
                set({ loading: true, error: null, success: false });
                try {
                    const newAddress = await userService.userService.createAddress(userId, addressData);
                    set(state => ({
                        addresses: [...state.addresses, newAddress],
                        loading: false,
                        success: true
                    }));
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to add address' 
                    });
                    throw error;
                }
            },

            // ✅ Atualizar endereço
            updateAddress: async (addressId: string, addressData: AddressData) => {
                set({ loading: true, error: null, success: false });
                try {
                    const updatedAddress = await userService.userService.updateAddress(addressId, addressData);
                    set(state => ({
                        addresses: state.addresses.map(address =>
                            address.id === addressId ? updatedAddress : address
                        ),
                        loading: false,
                        success: true
                    }));
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to update address' 
                    });
                    throw error;
                }
            },

            // ✅ Deletar endereço
            deleteAddress: async (addressId: string) => {
                set({ loading: true, error: null, success: false });
                try {
                    await userService.userService.deleteAddress(addressId);
                    set(state => ({
                        addresses: state.addresses.filter(address => address.id !== addressId),
                        loading: false,
                        success: true
                    }));
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to delete address' 
                    });
                    throw error;
                }
            },

            // ✅ Upload de avatar
            uploadAvatar: async (userId: string, file: File) => {
                set({ loading: true, error: null, success: false });
                try {
                    const updatedUser = await userService.userService.uploadAvatar(userId, file);
                    set({ 
                        currentUser: updatedUser,
                        loading: false,
                        success: true
                    });
                } catch (error) {
                    set({ 
                        loading: false, 
                        error: error instanceof Error ? error.message : 'Failed to upload avatar' 
                    });
                    throw error;
                }
            },

            // ✅ Resetar estado
            resetUserState: () => set(initialState)
        }),
        {
            name: 'user-store',
            partialize: (state) => ({
                currentUser: state.currentUser,
                users: state.users,
                addresses: state.addresses,
                stats: state.stats
            }),
            // Opcional: usar sessionStorage em vez de localStorage
            // storage: createJSONStorage(() => sessionStorage),
        }
    )
);