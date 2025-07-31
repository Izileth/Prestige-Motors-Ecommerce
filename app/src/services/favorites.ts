import api from "./api";

import type {
    Vehicle,
} from "../types/vehicle";

export const vehicleFavoritesService = {
    async addFavorite(vehicleId: string): Promise<Vehicle> {
        await api.post(`/vehicles/${vehicleId}/favorites`);
        // Busca o veículo completo após adicionar aos favoritos
        const response = await api.get(`/vehicles/${vehicleId}`);
        return response.data;
    },

    async removeFavorite(vehicleId: string): Promise<{ id: string }> {
        await api.delete(`/vehicles/${vehicleId}/favorites`);
        return { id: vehicleId };
    },

    async getUserFavorites(): Promise<Vehicle[]> {
        const response = await api.get("/vehicles/me/favorites", {
        params: {
            include: "vehicle",
        },
        });

        // Processamento mais robusto da resposta
        if (response.data?.data) {
        return response.data.data.map((fav: any) => ({
            ...fav.vehicle,
            isFavorite: true,
            favoritedAt: fav.createdAt,
        }));
        }
        return [];
    },

};

export default vehicleFavoritesService;
