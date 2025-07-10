// stores/reviewStore.ts
import { create } from 'zustand';
import vehicleService from '~/services/vehicle';
import type { ReviewsStore } from '~/types/reviews';
export const useReviewStore = create<ReviewsStore>((set, get) => ({
    // Estado inicial
    reviews: {},
    stats: {},
    loading: false,
    error: null,

    // Ações
    fetchReviews: async (vehicleId) => {
        if (get().reviews[vehicleId]) return;

        set({ loading: true, error: null });
        try {
            const reviews = await vehicleService.getVehicleReviews(vehicleId);
            set(state => ({
                reviews: { ...state.reviews, [vehicleId]: reviews },
                loading: false
            }));
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch reviews',
                loading: false
            });
        }
    },

    fetchStats: async (vehicleId) => {
        if (get().stats[vehicleId]) return;

        set({ loading: true, error: null });
        try {
            const stats = await vehicleService.getReviewStats(vehicleId);
            set(state => ({
                stats: { ...state.stats, [vehicleId]: stats },
                loading: false
            }));
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch stats',
                loading: false
            });
        }
    },

    

    // No seu arquivo de store (reviewStore.ts)
    createReview: async (vehicleId, data) => {  // Adicione o parâmetro data
        set({ loading: true, error: null });
        try {
            const newReview = await vehicleService.createReview({
                vehicleId,
                rating: data.rating,  // Use o rating do formulário
                comentario: data.comentario || ''  // Use o comentário do formulário
            });
            
            set(state => ({
                reviews: {
                    ...state.reviews,
                    [vehicleId]: [...(state.reviews[vehicleId] || []), newReview]
                },
                stats: {}, // Invalida cache de stats
                loading: false
            }));
            
            return newReview;
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to create review',
                loading: false
            });
            throw error;
        }
    },

    updateReview: async (reviewId, data) => {
        set({ loading: true, error: null });
        try {
            const updatedReview = await vehicleService.updateReview(reviewId, data);
            set(state => {
                const updatedReviews = { ...state.reviews };
                for (const vehicleId in updatedReviews) {
                    const index = updatedReviews[vehicleId].findIndex(r => r.id === reviewId);
                    if (index !== -1) {
                        updatedReviews[vehicleId] = [...updatedReviews[vehicleId]];
                        updatedReviews[vehicleId][index] = updatedReview;
                        return {
                            reviews: updatedReviews,
                            stats: {},
                            loading: false
                        };
                    }
                }
                return { loading: false };
            });
            return updatedReview;
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to update review',
                loading: false
            });
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        set({ loading: true, error: null });
        try {
            await vehicleService.deleteReview(reviewId);
            set(state => {
                const updatedReviews = { ...state.reviews };
                for (const vehicleId in updatedReviews) {
                    updatedReviews[vehicleId] = updatedReviews[vehicleId].filter(r => r.id !== reviewId);
                }
                return {
                    reviews: updatedReviews,
                    stats: {},
                    loading: false
                };
            });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Failed to delete review',
                loading: false
            });
            throw error;
        }
    },

    clearReviews: () => set({ reviews: {}, stats: {}, error: null })
}));