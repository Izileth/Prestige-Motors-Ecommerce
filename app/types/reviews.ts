export interface Review {
    id: string;
    vehicleId: string;
    userId: string;
    rating: number;
    comentario: string | null;
    createdAt: string;
    updatedAt: string;
    user: {
        nome: string;
        avatar: string | null;
    };
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<number, number>; // {1: x, 2: y, ...5: z}

}

export interface ReviewCreateInput {
    rating: number;
    comentario?: string;
}

export interface ReviewUpdateInput extends ReviewCreateInput {
    id: string;
}