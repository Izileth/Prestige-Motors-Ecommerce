import { useCallback } from 'react';
import { useAddressStore } from '../store/slices/address';
import type { 
    VehicleWithAddress,
    AddressUpdatePayload,
    AddressRemovePayload,
    AddressCreatePayload
} from '~/src/types/vehicle';
import type { VehicleAddress } from '~/src/types/vehicle';

interface UseVehicleAddressReturn {
    // Estados
    currentAddress: VehicleAddress | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    
    // Funções
    getAddress: (vehicleId: string) => Promise<void>;
    createAddress: (payload: AddressCreatePayload) => Promise<VehicleWithAddress>;
    updateAddress: (payload: AddressUpdatePayload) => Promise<VehicleWithAddress>;
    removeAddress: (payload: AddressRemovePayload) => Promise<VehicleWithAddress>;
    resetAddressState: () => void;
}

export const useVehicleAddress = (): UseVehicleAddressReturn => {
    // Acessa o store Zustand
    const {
        currentAddress,
        loading,
        error,
        success,
        getAddress,
        createAddress,
        updateAddress,
        removeAddress,
        reset
    } = useAddressStore();

    // Versão memoizada das funções para garantir referências estáveis
    const memoizedGetAddress = useCallback(async (vehicleId: string) => {
        await getAddress(vehicleId);
    }, [getAddress]);

    const memoizedCreateAddress = useCallback(async (payload: AddressCreatePayload) => {
        return await createAddress(payload);
    }, [createAddress]);

    const memoizedUpdateAddress = useCallback(async (payload: AddressUpdatePayload) => {
        return await updateAddress(payload);
    }, [updateAddress]);

    const memoizedRemoveAddress = useCallback(async (payload: AddressRemovePayload) => {
        return await removeAddress(payload);
    }, [removeAddress]);

    const resetAddressState = useCallback(() => {
        reset();
    }, [reset]);

    return {
        // Estados
        currentAddress,
        loading,
        error,
        success,
        
        // Funções
        getAddress: memoizedGetAddress,
        createAddress: memoizedCreateAddress,
        updateAddress: memoizedUpdateAddress,
        removeAddress: memoizedRemoveAddress,
        resetAddressState
    };
};