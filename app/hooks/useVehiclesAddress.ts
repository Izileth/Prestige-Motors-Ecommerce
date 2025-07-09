import { useCallback } from 'react';
import { useAppDispatch } from '~/store/hooks';
import vehicleService from '~/services/vehicle';
import type { VehicleAddress, AddressUpdatePayload } from '~/types/vehicle';

export const useVehicleAddress = () => {
    const dispatch = useAppDispatch();

    const updateAddress = useCallback(async (payload: AddressUpdatePayload) => {
        try {
            const updatedVehicle = await vehicleService.updateVehicleAddress(payload);
            // Atualize o estado do veículo na store se necessário
            return updatedVehicle;
        } catch (error) {
            console.error('Failed to update address:', error);
            throw error;
        }
    }, [dispatch]);

    const removeAddress = useCallback(async (vehicleId: string) => {
        try {
            const updatedVehicle = await vehicleService.removeVehicleAddress({ vehicleId });
            // Atualize o estado do veículo na store se necessário
            return updatedVehicle;
        } catch (error) {
            console.error('Failed to remove address:', error);
            throw error;
        }
    }, [dispatch]);

    const getAddress = useCallback(async (vehicleId: string) => {
        try {
            return await vehicleService.getVehicleAddress(vehicleId);
        } catch (error) {
            console.error('Failed to get address:', error);
            throw error;
        }
    }, []);

    return {
        updateAddress,
        removeAddress,
        getAddress
    };
};