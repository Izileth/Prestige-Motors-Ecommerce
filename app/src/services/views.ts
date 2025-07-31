import api from "./api";

export const vehicleViewService = {
    async registerVehicleView(vehicleId: string): Promise<void> {
        await api.post(`/vehicles/${vehicleId}/views`);
    },

    async getVehicleViews(): Promise<number> {
        const response = await api.get("/vehicles/me/views");
        return response.data;
    },
};

export default vehicleViewService;
