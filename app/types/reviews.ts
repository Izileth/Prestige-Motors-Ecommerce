
export interface Review {
    id: string;
    vehicleId: string;
    userId: string;
    rating: number;
    comentario?: string;
    createdAt: string;
    updatedAt: string;
    user?: {
        nome: string;
        avatar?: string;
    };
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<number, number>;
}

export interface ReviewCreateInput {
    vehicleId: string;  // Adicione esta linha
    rating: number;
    comentario?: string;
}

export interface ReviewUpdateInput extends ReviewCreateInput {
    id: string;
}

// Separamos o estado das ações
interface ReviewsStoreState {
    reviews: Record<string, Review[]>;
    stats: Record<string, ReviewStats>;
    loading: boolean;
    error: string | null;
}

interface ReviewsStoreActions {
    fetchReviews: (vehicleId: string) => Promise<void>;
    fetchStats: (vehicleId: string) => Promise<void>;
    createReview: (vehicleId: string, data: ReviewCreateInput) => Promise<Review>;
    updateReview: (reviewId: string, data: ReviewUpdateInput) => Promise<Review>;
    deleteReview: (reviewId: string) => Promise<void>;
    clearReviews: () => void;
}


export type ReviewsStore = ReviewsStoreState & ReviewsStoreActions;