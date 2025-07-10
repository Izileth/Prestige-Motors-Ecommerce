import { useAddressStore } from '~/store/slices/address';
import { useCallback } from 'react';
import type {
    VehicleAddress,
    AddressUpdatePayload,
    AddressRemovePayload
} from '~/types/vehicle';

export const useVehicleAddress = () => {
    const {
        currentAddress,
        loading,
        error,
        success,
        getAddress,
        updateAddress,
        removeAddress,
        reset
    } = useAddressStore();

    // Versão memoizada com tratamento de erro aprimorado
    const handleGetAddress = useCallback(async (vehicleId: string) => {
        try {
            await getAddress(vehicleId);
        } catch (err) {
            console.error('Failed to load address:', err);
            throw err;
        }
    }, [getAddress]);

    const handleUpdateAddress = useCallback(async (payload: AddressUpdatePayload) => {
        try {
            const result = await updateAddress(payload);
            return result;
        } catch (err) {
            console.error('Failed to update address:', err);
            throw err;
        }
    }, [updateAddress]);

    const handleRemoveAddress = useCallback(async (vehicleId: string) => {
        try {
            const result = await removeAddress({ vehicleId });
            return result;
        } catch (err) {
            console.error('Failed to remove address:', err);
            throw err;
        }
    }, [removeAddress]);

    return {
        address: currentAddress,
        isLoading: loading,
        error,
        success,
        getAddress: handleGetAddress,
        updateAddress: handleUpdateAddress,
        removeAddress: handleRemoveAddress,
        resetAddressState: reset
    };
};