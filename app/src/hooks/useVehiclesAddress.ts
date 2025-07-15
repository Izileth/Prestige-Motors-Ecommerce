import { useCallback } from 'react';
import { useAppDispatch } from '~/src/store/hooks';
import vehicleService from '~/src/services/vehicle';
import { useAddressStore } from '~/src/store/slices/address';
import type { 
    VehicleAddress, 
    AddressUpdatePayload,
    AddressRemovePayload 
} from '~/src/types/vehicle';

// Novo tipo para criação de endereço
interface AddressCreatePayload {
    vehicleId: string;
    address: Omit<VehicleAddress, 'id'> & { id?: never };
}

export const useVehicleAddress = () => {
    const dispatch = useAppDispatch();
    
    // PEGAR OS ESTADOS DO STORE ZUSTAND
    const {
        currentAddress,
        loading,
        error,
        success,
        getAddress: getAddressFromStore,
        createAddress: createAddressFromStore,
        updateAddress: updateAddressFromStore,
        removeAddress: removeAddressFromStore,
        reset: resetAddressState
    } = useAddressStore();

    const createAddress = useCallback(async (payload: AddressCreatePayload) => {
        return await createAddressFromStore(payload);
    }, [createAddressFromStore]);

    const updateAddress = useCallback(async (payload: AddressUpdatePayload) => {
        return await updateAddressFromStore(payload);
    }, [updateAddressFromStore]);

    const removeAddress = useCallback(async (payload: AddressRemovePayload) => {
        return await removeAddressFromStore(payload);
    }, [removeAddressFromStore]);

    const getAddress = useCallback(async (vehicleId: string) => {
        return await getAddressFromStore(vehicleId);
    }, [getAddressFromStore]);

    return {
        // ESTADOS
        currentAddress,
        loading,
        error,
        success,
        // FUNÇÕES
        createAddress,
        updateAddress,
        removeAddress,
        getAddress,
        resetAddressState
    };
};