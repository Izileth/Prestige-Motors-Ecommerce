import { create } from 'zustand';
import { vehicleService } from '~/services/vehicle';
import type {
    VehicleAddress,
    VehicleWithAddress,
    AddressUpdatePayload,
    AddressRemovePayload
} from '~/types/vehicle';

interface AddressState {
    currentAddress: VehicleAddress | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    
    // Actions
    getAddress: (vehicleId: string) => Promise<void>;
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
            const address = await vehicleService.getVehicleAddress(vehicleId);
            set({ currentAddress: address, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch address',
                loading: false 
            });
        }
    },

    updateAddress: async (payload) => {
        set({ loading: true, error: null, success: false });
        try {
            const updatedVehicle = await vehicleService.updateVehicleAddress(payload);
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
            const updatedVehicle = await vehicleService.removeVehicleAddress(payload);
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