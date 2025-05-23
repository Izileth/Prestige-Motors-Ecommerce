import type { Review, ReviewStats } from "./reviews";

export interface Vehicle {
    id: string;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    preco: number;
    precoPromocional?: number;
    descricao?: string;
    quilometragem: number;
    tipoCombustivel: 'GASOLINA' | 'ETANOL' | 'FLEX' | 'DIESEL' | 'ELETRICO' | 'HIBRIDO' | 'GNV';
    cambio: 'MANUAL' | 'AUTOMATICO' | 'SEMI_AUTOMATICO' | 'CVT';
    cor: string;
    portas: number;
    finalPlaca?: number;
    carroceria: 'HATCH' | 'SEDAN' | 'SUV' | 'PICAPE' | 'COUPE' | 'CONVERSIVEL' | 'PERUA' | 'MINIVAN' | 'VAN' | 'BUGGY' | 'OFFROAD';
    potencia?: number;
    motor?: string;
    categoria: 'HYPERCAR' | 'SUPERCAR' | 'SPORTS_CAR' | 'CLASSIC_MUSCLE' | 'MODERN_MUSCLE' | 'RETRO_SUPER' | 'DRIFT_CAR' | 'TRACK_TOY' | 'OFFROAD' | 'BUGGY' | 'PICKUP_4X4' | 'SUV' | 'HOT_HATCH' | 'SALOON' | 'GT' | 'RALLY' | 'CONCEPT';
    classe: 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
    destaque?: boolean;
    seloOriginal?: boolean;
    aceitaTroca?: boolean;
    parcelamento?: number;
    localizacaoId?: string;
    imagens: VehicleImage[];
    isFavorite?: boolean;
    status: 'DISPONIVEL' | 'VENDIDO' | 'RESERVADO';
    createdAt: string;
    updatedAt: string;
    visualizacoes: number;
    vendedorId: string;
    vendedor: {
        id: string;
        nome: string;
        email: string;
        telefone: string;
    };
    videos: VehicleVideo[];
    especificacoes: Record<string, unknown> | null;
    localizacao: {
        cidade: string;
        estado: string;
    } | null;
    
    
    avaliacoes: Review[];
    reviewStats: ReviewStats;
}

export interface VehicleImage {
    id: string;
    url: string;
    isMain?: boolean;
    ordem?: number;
    publicId?: string;
}

export interface VehicleVideo {
    id: string;
    url: string;
}

export interface VehicleUserStats {
    totalVehicles: number;
    byFuelType: Record<string, number>;
    byCategory: Record<string, number>;
    averagePrice: number;
}


export interface VehicleUserTotalStats {
    _sum: {
        preco: number | null;
    };
    _avg: {
        preco: number | null;
        anoFabricacao: number | null;
        anoModelo: number | null;
    };
    _min: {
        preco: number | null;
    };
    _max: {
        preco: number | null;
    };
}


export interface VehicleSearchParams {
    userId?: string;
    marca?: string;
    modelo?: string;
    precoMin?: number;
    precoMax?: number;
    anoMin?: number;
    anoMax?: number;
    combustivel?: string;
    carroceria?: string;
    cambio?: string;
    categoria?: string;
    destaque?: boolean;
    classe?: string;
}


export interface VehicleCreateInput {
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    preco: number;
    quilometragem: number;
    tipoCombustivel: 'GASOLINA' | 'ETANOL' | 'FLEX' | 'DIESEL' | 'ELETRICO' | 'HIBRIDO' | 'GNV';
    cambio: 'MANUAL' | 'AUTOMATICO' | 'SEMI_AUTOMATICO' | 'CVT';
    cor: string;
    portas: number;
    finalPlaca?: number;
    carroceria: 'HATCH' | 'SEDAN' | 'SUV' | 'PICAPE' | 'COUPE' | 'CONVERSIVEL' | 'PERUA' | 'MINIVAN' | 'VAN' | 'BUGGY' | 'OFFROAD';
    potencia?: number;
    motor?: string;
    categoria: 'HYPERCAR' | 'SUPERCAR' | 'SPORTS_CAR' | 'CLASSIC_MUSCLE' | 'MODERN_MUSCLE' | 'RETRO_SUPER' | 'DRIFT_CAR' | 'TRACK_TOY' | 'OFFROAD' | 'BUGGY' | 'PICKUP_4X4' | 'SUV' | 'HOT_HATCH' | 'SALOON' | 'GT' | 'RALLY' | 'CONCEPT';
    classe: 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
    destaque?: boolean;
    seloOriginal?: boolean;
    aceitaTroca?: boolean;
    parcelamento?: number;
    localizacaoId?: string;
    descricao?: string;
    precoPromocional?: number;
    status?: 'DISPONIVEL' | 'VENDIDO' | 'RESERVADO'; 
}

export type VehicleError = {
    message: string;
    type?: 'auth' | 'api' | 'validation';
};


export type VehicleStatsData = {
    marcas: { marca: string; quantidade: number }[];
    estatisticas: {
        precoMedio: number;
        quilometragemMedia: number;
        anoFabricacaoMedio: number;
        anoModeloMedio: number;
    };
};