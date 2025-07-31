import { create } from 'zustand';
import vehicleService from '~/src/services/vehicle';
import type { Review, ReviewStats, ReviewCreateInput, ReviewUpdateInput } from '~/src/types/reviews';
import reviewService from '~/src/services/reviews';
interface ReviewState {
    reviews: Record<string, Review[]>;
    stats: Record<string, ReviewStats>;
    loading: boolean;
    error: string | null;
}

interface ReviewActions {
    fetchReviews: (vehicleId: string) => Promise<void>;
    fetchStats: (vehicleId: string) => Promise<void>;
    createReview: (data: ReviewCreateInput) => Promise<Review>;
    updateReview: (reviewId: string, data: ReviewUpdateInput) => Promise<Review>;
    deleteReview: (reviewId: string) => Promise<void>;
    clearError: () => void;
}

export const useReviewStore = create<ReviewState & ReviewActions>((set, get) => ({
    reviews: {},
    stats: {},
    loading: false,
    error: null,
    
    // Busca Avaliações
    fetchReviews: async (vehicleId: string) => {
        set({ loading: true, error: null });
        try {
            const reviews = await reviewService.getVehicleReviews(vehicleId);
            set(state => ({
                reviews: { ...state.reviews, [vehicleId]: reviews },
                loading: false
            }));
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao carregar avaliações',
                loading: false 
            });
        }
    },

    // Busca estatisticas das Avaliações  
    fetchStats: async (vehicleId: string) => {
        set({ loading: true, error: null });
        try {
            const stats = await reviewService.getReviewStats(vehicleId);
            set(state => ({
                stats: { ...state.stats, [vehicleId]: stats },
                loading: false
            }));
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao carregar estatísticas',
                loading: false 
            });
        }
    },

    // Cria Avaliação
    createReview: async (data: ReviewCreateInput) => {
        set({ loading: true, error: null });
        try {
            console.log('Store createReview - data:', data);
            
            const newReview = await reviewService.createReview(data);
            const { vehicleId } = data;
            
            set(state => ({
                reviews: {
                    ...state.reviews,
                    [vehicleId]: [...(state.reviews[vehicleId] || []), newReview]
                },
                loading: false
            }));
            
            return newReview;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao criar avaliação';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },
    
    // Atualiza Avaliação
    updateReview: async (reviewId: string, data: ReviewUpdateInput) => {
        set({ loading: true, error: null });
        try {
            console.log('Store updateReview - reviewId:', reviewId);
            console.log('Store updateReview - data:', data);
            
            const updatedReview = await reviewService.updateReview(reviewId, data);
            const vehicleId = data.vehicleId || updatedReview.vehicleId;
            
            set(state => ({
                reviews: {
                    ...state.reviews,
                    [vehicleId]: (state.reviews[vehicleId] || []).map(review =>
                        review.id === reviewId ? updatedReview : review
                    )
                },
                loading: false
            }));
            
            return updatedReview;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar avaliação';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },


    // Exclui Avaliação
    deleteReview: async (reviewId: string) => {
        set({ loading: true, error: null });
        try {
            console.log('Store deleteReview - reviewId:', reviewId);
            
            await reviewService.deleteReview(reviewId);
            
            // Remove a review de todos os veículos (já que não sabemos qual veículo)
            set(state => ({
                reviews: Object.keys(state.reviews).reduce((acc, vehicleId) => {
                    acc[vehicleId] = state.reviews[vehicleId].filter(review => review.id !== reviewId);
                    return acc;
                }, {} as Record<string, Review[]>),
                loading: false
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir avaliação';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },

    clearError: () => set({ error: null })
}));