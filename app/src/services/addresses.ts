import api from "./api";

import type {
    VehicleAddress,
    AddressUpdatePayload,
    AddressRemovePayload,
    VehicleWithAddress,
    AddressCreatePayload,
} from "../types/vehicle";


export const vehicleAddressService = {
    // Adicionar ou atualizar endereço de um veículo

    // Criar novo endereço para um veículo (POST)
    async createVehicleAddress(
        payload: AddressCreatePayload
    ): Promise<VehicleWithAddress> {
        const { vehicleId, address } = payload;
        const url = `/vehicles/${vehicleId}/address`;

        const response = await api.post(url, address);
        console.log("Endereço Criado!", response.data);
        return response.data;
    },

    // Atualizar endereço existente de um veículo (PUT)
    async updateVehicleAddress(
        payload: AddressUpdatePayload
    ): Promise<VehicleWithAddress> {
        const { vehicleId, address } = payload;
        const url = `/vehicles/${vehicleId}/address`;

        const response = await api.put(url, address);
        console.log("Endereço Atualizado!", response.data);
        return response.data;
    },

    // Remover endereço de um veículo (DELETE)
    async removeVehicleAddress(
        payload: AddressRemovePayload
    ): Promise<VehicleWithAddress> {
        const { vehicleId } = payload;
        const response = await api.delete(`/vehicles/${vehicleId}/address`);
        console.log("Endereço Removido!", response.data);
        return response.data;
    },

    // Obter endereço de um veículo (GET)
    async getVehicleAddress(vehicleId: string): Promise<VehicleAddress | null> {
        try {
        const response = await api.get(`/vehicles/${vehicleId}/address`);
        console.log("Endereço obtido!", response.data);
        return response.data;
        } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
        }
    },
};

export default vehicleAddressService;
