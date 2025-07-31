import { create } from 'zustand';

import vehicleAddressService from '~/src/services/addresses';

import type {
    VehicleAddress,
    VehicleWithAddress,
    AddressUpdatePayload,
    AddressRemovePayload,
    AddressCreatePayload
} from '~/src/types/vehicle';



interface AddressState {
    currentAddress: VehicleAddress | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    
    // Actions atualizadas
    getAddress: (vehicleId: string) => Promise<void>;
    createAddress: (payload: AddressCreatePayload) => Promise<VehicleWithAddress>;
    updateAddress: (payload: AddressUpdatePayload) => Promise<VehicleWithAddress>;
    removeAddress: (payload: AddressRemovePayload) => Promise<VehicleWithAddress>;
    reset: () => void;
}

export const useAddressStore = create<AddressState>((set) => ({
    currentAddress: null,
    loading: false,
    error: null,
    success: false,

    getAddress: async (vehicleId) => {
        set({ loading: true, error: null });
        try {
            const address = await vehicleAddressService.getVehicleAddress(vehicleId);
            set({ currentAddress: address, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch address',
                loading: false 
            });
        }
    },

    createAddress: async (payload) => {
        set({ loading: true, error: null, success: false });
        try {
            const updatedVehicle = await vehicleAddressService.createVehicleAddress(payload);
            set({ 
                currentAddress: updatedVehicle.localizacao,
                loading: false,
                success: true
            });
            return updatedVehicle;
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to create address',
                loading: false 
            });
            throw error;
        }
    },

    updateAddress: async (payload) => {
        set({ loading: true, error: null, success: false });
        try {
            const updatedVehicle = await vehicleAddressService.updateVehicleAddress(payload);
            set({ 
                currentAddress: updatedVehicle.localizacao,
                loading: false,
                success: true
            });
            return updatedVehicle;
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to update address',
                loading: false 
            });
            throw error;
        }
    },

    removeAddress: async (payload) => {
        set({ loading: true, error: null, success: false });
        try {
            const updatedVehicle = await vehicleAddressService.removeVehicleAddress(payload);
            set({ 
                currentAddress: null,
                loading: false,
                success: true
            });
            return updatedVehicle;
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to remove address',
                loading: false 
            });
            throw error;
        }
    },

    reset: () => set({ 
        currentAddress: null,
        loading: false,
        error: null,
        success: false
    })
}));