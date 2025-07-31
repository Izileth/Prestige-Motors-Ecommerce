import api from "./api";

import type {
    Review,
    ReviewStats,
    ReviewUpdateInput,
    ReviewCreateInput,
} from "../types/reviews";


export const reviewService = {
    async createReview(data: ReviewCreateInput): Promise<Review> {
        const { vehicleId, ...reviewData } = data;
        const response = await api.post(
        `/vehicles/${vehicleId}/reviews`,
        reviewData
        );
        console.log("Avaliação Criada!", response.data);
        return response.data;
    },

    async updateReview(
        reviewId: string,
        data: ReviewUpdateInput
    ): Promise<Review> {
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
};

export default reviewService;
