import api from './api';

import type { Vehicle, VehicleGlobalStats, VehicleCreateInput, VehicleUserStats,VehicleSearchParams, VehicleAddress, AddressUpdatePayload, AddressRemovePayload, VehicleWithAddress  } from '../types/vehicle';

import type { Review, ReviewStats, ReviewUpdateInput, ReviewCreateInput } from '../types/reviews';

import type { VehicleUpdateInput } from '../types/inputs';

import type { VehicleStatsData } from '~/components/template/statistics/statistcs';
import type { UserStats } from '~/types/user';

export const vehicleService = {

    async getVehicles(params?: VehicleSearchParams): Promise<Vehicle[]> {
        // Limpa parâmetros undefined/null/empty
        const cleanParams = Object.fromEntries(
            Object.entries(params || {}).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        );

        console.log('Enviando parâmetros para API:', cleanParams); // Debug
        
        const response = await api.get('/vehicles', { 
            params: cleanParams,
            paramsSerializer: {
                indexes: null // Evita notação de colchetes nos arrays
            }
        });
        
        console.log('Resposta da API:', response.config.url); // Verifique a URL final
        return response.data?.data || [];
    },

    async getVehicleById(id: string): Promise<Vehicle> {
        const response = await api.get(`/vehicles/${id}`);
        return response.data;
    },

    async createVehicle(data: VehicleCreateInput): Promise<Vehicle> {
        const response = await api.post<Vehicle>('/vehicles', data);
         console.log("Veículo Criado!", response.data);
        return response.data;
    },

    async updateVehicle(id: string, data: VehicleUpdateInput): Promise<Vehicle> {
        const response = await api.put(`/vehicles/${id}`, data);
        return response.data;
    },

    async deleteVehicle(id: string): Promise<void> {
        await api.delete(`/vehicles/${id}`);
    },

    async registerVehicleView(vehicleId: string): Promise<void> {
        await api.post(`/vehicles/${vehicleId}/views`);
    },
    
    async getVehicleViews(): Promise<number> {
        const response = await api.get('/vehicles/me/views');
        return response.data;
    },
     
    async getFeaturedVehicles(): Promise<Vehicle[]> {
        const response = await api.get('/vehicles', { 
        params: { 
            destaque: true,
            limit: 8,
            sort: '-createdAt'
        } 
        });
        return response.data.data || [];
    },



    async addFavorite(vehicleId: string): Promise<Vehicle> {
        await api.post(`/vehicles/${vehicleId}/favorites`);
        // Busca o veículo completo após adicionar aos favoritos
        const response = await api.get(`/vehicles/${vehicleId}`);
        return response.data;
    },

    async removeFavorite(vehicleId: string): Promise<{id: string}> {
        await api.delete(`/vehicles/${vehicleId}/favorites`);
        return { id: vehicleId };
    },

   
    async getUserFavorites(): Promise<Vehicle[]> {
        const response = await api.get('/vehicles/me/favorites', {
        params: {
            include: 'vehicle'
        }
        });
        
        // Processamento mais robusto da resposta
        if (response.data?.data) {
        return response.data.data.map((fav: any) => ({
            ...fav.vehicle,
            isFavorite: true,
            favoritedAt: fav.createdAt
        }));
        }
        return [];
    },



    async createReview(data: ReviewCreateInput): Promise<Review> {
        const { vehicleId, ...reviewData } = data;
        const response = await api.post(`/vehicles/${vehicleId}/reviews`, reviewData);
        console.log("Avaliação Criada!", response.data);
        return response.data;
    },

    async updateReview(reviewId: string, data: ReviewUpdateInput): Promise<Review> {
        const response = await api.put(`/vehicles/reviews/${reviewId}`, data);
        console.log("Avaliação Atualizada!", response.data);
        return response.data;
    },

    async deleteReview(reviewId: string): Promise<void> {
        console.log("Excluindo Avaliação com ID:", reviewId);
        await api.delete(`/vehicles/reviews/${reviewId}`);
    },
    async getVehicleReviews(vehicleId: string): Promise<Review[]> {
        const response = await api.get(`/vehicles/${vehicleId}/reviews`);
        // Verifica se a resposta contém dados
        if (!response.data || !Array.isArray(response.data)) {
            return [];
        }
        console.log("Avaliações obtidas:", response.data);
        return response.data;
    },

    async getReviewStats(vehicleId: string): Promise<ReviewStats> {
        const response = await api.get(`/vehicles/${vehicleId}/reviews/stats`);
        return response.data;
    },

    // Obter estatísticas globais de veículos

    async getVehicleStats(): Promise<VehicleStatsData> {
        const response = await api.get('/vehicles/stats');
        return response.data;
    },

    // Novos métodos adicionados

    async getUserVehicles(): Promise<Vehicle[]> {
        const response = await api.get('/vehicles/me/vehicles');
        return response.data.data || []; // Acessa a propriedade data
    },

    async getUserVehicleStats(): Promise<UserStats> {
        const response = await api.get('/vehicles/me/vehicle-stats');
        return response.data.stats || null;
    },

    async getVehiclesByVendor(vendorId: string): Promise<Vehicle[]> {
        const response = await api.get(`/vehicles/vendors/${vendorId}`);
        return response.data;
    },

    async updateVehicleStatus(id: string, status: string): Promise<Vehicle> {
        const response = await api.put(`/vehicles/${id}/status`, { status });
        return response.data;
    },

    async uploadImages(vehicleId: string, files: File[]): Promise<Vehicle> {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file)); // <-- 'images' deve bater com o nome no multer
        
        const response = await api.post(`/vehicles/${vehicleId}/images`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data', // <-- Isso está correto
            },
        });
        return response.data;
    },

    async uploadVideos(vehicleId: string, file: File): Promise<Vehicle> {
        const formData = new FormData();
        formData.append('video', file);
        
        const response = await api.post(`/vehicles/${vehicleId}/videos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Adicionar ou atualizar endereço de um veículo
    async updateVehicleAddress(payload: AddressUpdatePayload): Promise<VehicleWithAddress> {
        const { vehicleId, address } = payload;
        
        // Se o endereço tem ID, é uma atualização, senão é criação
        const method = address.id ? 'put' : 'post';
        const url = address.id 
            ? `/vehicles/${vehicleId}/address/${address.id}`
            : `/vehicles/${vehicleId}/address`;

        const response = await api[method](url, address);
        console.log("Endereço Atualizado!", response.data);
        return response.data;
    },

    // Remover endereço de um veículo
    async removeVehicleAddress(payload: AddressRemovePayload): Promise<VehicleWithAddress> {
        const { vehicleId } = payload;
        const response = await api.delete(`/vehicles/${vehicleId}/address`);
        console.log("Endereço Removido!", response.data);
        return response.data;
    },

    // Obter endereço de um veículo
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
    async deleteVehicleImage(vehicleId: string, imageId: string): Promise<void> {
    // Enviar o ID da imagem com um nome de parâmetro mais claro
    await api.delete(`/vehicles/${vehicleId}/images`, {
        data: { imageId } // Usar imageId em vez de imageUrl para maior clareza
    });
    
    } 
};

export default vehicleService;