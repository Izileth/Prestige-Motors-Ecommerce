export interface User {
    id: string;
    nome: string;
    email: string;
    role: string;
    avatar: string | null;
    telefone: string | null;
    cpf: string | null;
    dataNascimento: string | null;
    
    // Logins
    isLoggedIn: boolean;
    lastLoginAt: string | null;
    lastLogoutAt: string | null;
    currentSessionId: string | null;
    loginCount: number;
}

export interface UserUpdateData {
    nome?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
    telefone?: string | null;
    cpf?: string | null;
    dataNascimento?: string | null;
    senhaAtual?: string;
    senha?: string;
}

// Interface expandida com todos os campos da API
export interface UserStats {
    // Estatísticas básicas
    totalVehicles: number;
    valorTotalInventario: number;
    precoMedio: number;
    anoFabricacaoMedio: number;
    anoModeloMedio: number;
    precoMinimo: number;
    precoMaximo: number;
    
    // Timeline de veículos
    vehicleTimeline: Array<{
        _count: {
            id: number;
        };
        createdAt: string; // ISO string
    }>;
    
    // Distribuição de preços
    priceDistribution: Array<{
        _count: {
            id: number;
        };
        preco: number;
    }>;
    
    // Distribuição por marca
    brandDistribution: Array<{
        _count: {
            id: number;
        };
        marca: string;
    }>;
    
    // Distribuição por status
    statusDistribution: Array<{
        _count: {
            id: number;
        };
        status: string;
    }>;
    
    // Distribuição por categoria
    categoryDistribution: Array<{
        _count: {
            id: number;
        };
        categoria: string;
    }>;
    
    // Estatísticas de vendas
    salesStats: {
        totalSalesValue: number;
        totalVehiclesSold: number;
    };
    
    // Estatísticas de negociações
    negotiationStats: {
        totalNegotiations: number;
    };
}