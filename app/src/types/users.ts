
export interface User {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
    cpf?: string;
    dataNascimento?: string;
    role: 'USER' | 'ADMIN';
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        vehicles: number;
        addresses?: number;
        orders?: number;
    };
    
    isLoggedIn: boolean;
    lastLoginAt: string | null; // String ISO em vez de Date
    lastLogoutAt: string | null; // String ISO em vez de Date
    currentSessionId: string | null;
    loginCount: number;
}

export interface GetUsersResponse {
    users: User[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
}