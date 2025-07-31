import { useCallback } from 'react';
import { useReviewStore } from '~/src/store/slices/reviews';
import type { ReviewCreateInput, ReviewUpdateInput } from '../types/reviews';

export const useReviews = (vehicleId?: string) => {
    const {
        reviews,
        stats,
        loading,
        error,
        fetchReviews,
        fetchStats,
        createReview: createReviewAction,
        updateReview: updateReviewAction,
        deleteReview: deleteReviewAction
    } = useReviewStore();

    const loadReviews = useCallback(async () => {
        if (!vehicleId) return;
        await fetchReviews(vehicleId);
    }, [vehicleId, fetchReviews]);

    const loadStats = useCallback(async () => {
        if (!vehicleId) return;
        await fetchStats(vehicleId);
    }, [vehicleId, fetchStats]);

    // ✅ CORRIGIDO: Não depende do vehicleId do hook, usa o que vem nos dados
    const createReview = useCallback(async (data: ReviewCreateInput) => {
        console.log('Hook createReview - vehicleId from hook:', vehicleId);
        console.log('Hook createReview - vehicleId from data:', data.vehicleId);
        console.log('Hook createReview - full data:', data);
        
        // Valida se o vehicleId está nos dados
        if (!data.vehicleId) {
            throw new Error('Vehicle ID is required in review data');
        }
        
        // Passa os dados diretamente para o store
        return await createReviewAction(data);
    }, [createReviewAction]); // Remove dependência do vehicleId

    const updateReview = useCallback(async (reviewId: string, data: ReviewUpdateInput) => {
        console.log('Hook updateReview - reviewId:', reviewId);
        console.log('Hook updateReview - data:', data);
        
        if (!data.vehicleId) {
            throw new Error('Vehicle ID is required in review update data');
        }
        
        return await updateReviewAction(reviewId, data);
    }, [updateReviewAction]);

    const deleteReview = useCallback(async (reviewId: string) => {
        console.log('Hook deleteReview - reviewId:', reviewId);
        
        return await deleteReviewAction(reviewId);
    }, [deleteReviewAction]);

    const getCurrentReviews = useCallback(() => {
        return vehicleId ? reviews[vehicleId] || [] : [];
    }, [vehicleId, reviews]);

    const getCurrentStats = useCallback(() => {
        return vehicleId ? stats[vehicleId] : null;
    }, [vehicleId, stats]);

    return {
        reviews: getCurrentReviews(),
        stats: getCurrentStats(),
        loading,
        error,
        loadReviews,
        loadStats,
        createReview,
        updateReview,
        deleteReview,
        hasReviews: getCurrentReviews().length > 0
    };
};
