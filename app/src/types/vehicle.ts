import type { Review, ReviewStats } from "./reviews";
import type { Negotiation } from "./negociation";
// Vehicle Interface
export interface Vehicle {
    id: string;
    slug?: string; 
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

     
    aceitaNegociacao ?: boolean
    negociacoes ?: Negotiation[]
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




// Vehicle Search Parameters Interface
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


// Vehicle Create Input Interface
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



// Stats User & Global Interfaces
export interface VehicleStatsSummary {
    totalVehicles: number;
    totalViews: number;
    totalValue: number;
    averagePrice: number;
    averageMileage: number;
    totalFavorites: number;
    statusDistribution: Record<'VENDIDO' | 'DISPONIVEL' | 'RESERVADO', number>;
}

export interface TopPerformerVehicle {
    id: string;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    preco: number;
    precoPromocional?: number;
    visualizacoes: number;
    status: 'DISPONIVEL' | 'VENDIDO' | 'RESERVADO';
    imagens: Array<{
        url: string;
    }>;
    mainImage: string;
}

export interface TimeRange {
    start: string; 
    end: string; 
}

export interface VehicleStatsResponse {
    summary: VehicleStatsSummary;
    topPerformers: TopPerformerVehicle[];
    viewsTrend: Array<{
        date: string;
        views: number;
    }>; // Pode ser mais específico conforme seus dados
    timeRange: TimeRange;
}

export interface UserVehicleStatsResponse extends VehicleStatsResponse {
}

export type VehicleGlobalStats = VehicleStatsResponse;
export type VehicleUserStats = UserVehicleStatsResponse

//Address Interface

export interface VehicleAddress {
    id?: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais?: string;
    latitude?: number;
    longitude?: number;
}

export interface VehicleWithAddress extends Vehicle {
    localizacao: VehicleAddress | null;
}

export interface AddressUpdatePayload {
    vehicleId: string;
    address: VehicleAddress;
}

export interface AddressRemovePayload {
    vehicleId: string;
}


export interface AddressOperationResult {
    success: boolean;
    error?: string;
    address?: VehicleAddress | null;
}

export interface VehicleWithAddress extends Vehicle {
    localizacao: VehicleAddress | null;
    addressStatus?: {
        loading: boolean;
        error?: string;
    };
}
export interface AddressCreatePayload {
    vehicleId: string;
    address: Omit<VehicleAddress, 'id'> & { id?: never }; // Endereço sem ID para criação
}