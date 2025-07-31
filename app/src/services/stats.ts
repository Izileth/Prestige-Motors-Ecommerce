import api from "./api";

import type {
    Vehicle,
} from "../types/vehicle";

import type { VehicleStatsData } from "~/src/components/common/VehicleStatistics";
import type { UserStats } from "~/src/types/user";

export const vehicleStatsService = {
   // Obter estatísticas globais de veículos
    async getVehicleStats(): Promise<VehicleStatsData> {
        const response = await api.get("/vehicles/stats");
        return response.data;
    },

    // Obter Estatisticas de Globas do Usuario
    async getUserVehicles(): Promise<Vehicle[]> {
        const response = await api.get("/vehicles/me/vehicles");
        return response.data.data || []; // Acessa a propriedade data
    },

    async getUserVehicleStats(): Promise<UserStats> {
        const response = await api.get("/vehicles/me/vehicle-stats");
        return response.data.stats || null;
    },


};

export default vehicleStatsService;
