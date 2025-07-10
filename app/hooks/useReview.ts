
import { useCallback } from 'react';
import { useReviewStore } from '~/store/slices/reviews';
import type { ReviewCreateInput, ReviewUpdateInput } from '../types/reviews';

export const useReviews = (vehicleId?: string) => {
    const {
        reviews,
        stats,
        loading,
        error,
        fetchReviews,
        fetchStats,
        createReview,
        updateReview,
        deleteReview
    } = useReviewStore();

    const loadReviews = useCallback(async () => {
        if (!vehicleId) return;
        await fetchReviews(vehicleId);
    }, [vehicleId, fetchReviews]);

    const loadStats = useCallback(async () => {
        if (!vehicleId) return;
        await fetchStats(vehicleId);
    }, [vehicleId, fetchStats]);

    const addReview = useCallback(async (data: ReviewCreateInput) => {
        if (!vehicleId) throw new Error('Vehicle ID is required');
        return await createReview(vehicleId, data);
    }, [vehicleId, createReview]);

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
        createReview: addReview,
        updateReview,
        deleteReview,
        hasReviews: getCurrentReviews().length > 0
    };
};