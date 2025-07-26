import type { VehicleImage } from "./vehicle";
import type { User } from "./user";

export type NegotiationStatus = 
    | 'ABERTA' 
    | 'CONTRA_OFERTA' 
    | 'ACEITA' 
    | 'RECUSADA' 
    | 'CANCELADA' 
    | 'EXPIRADA';

export type MessageType = 
    | 'TEXTO' 
    | 'OFERTA' 
    | 'CONTRA_OFERTA' 
    | 'SISTEMA';

export interface Negotiation {
    id: string;
    vehicleId: string;
    compradorId: string;
    vendedorId: string;
    status: NegotiationStatus;
    precoSolicitado: number;
    precoOfertado: number;
    precoNegociado?: number;
    motivoRecusa?: string;
    tempoMedioResposta?: number;
    dataExpiracao?: Date;
    dataFechamento?: Date;
    createdAt: Date;
    updatedAt: Date;
    
    // Relacionamentos
    vehicle?: Vehicle;
    comprador?: Pick<User, 'id' | 'nome' | 'avatar' | 'telefone'>;
    vendedor?: Pick<User, 'id' | 'nome' | 'avatar' | 'telefone'>;
    mensagens?: NegotiationMessage[];
    _count?: {
        mensagens?: number;
    };
}
interface Vehicle {
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
    mainImage: string;
    imagens: VehicleImage[];
    isFavorite?: boolean;
    status: 'DISPONIVEL' | 'VENDIDO' | 'RESERVADO';
    createdAt: string;
    updatedAt: string;
    visualizacoes: number;
    vendedorId: string;
    aceitaNegociacao ?: boolean
    negociacoes ?: Negotiation[]
}

export interface NegotiationMessage {
    id: string;
    autorId: string;
    conteudo: string;
    tipo: MessageType;
    createdAt: string;
    autor?: Pick<User, 'id' | 'nome' | 'avatar'>;
}

export interface NegotiationHistory {
    id: string;
    negociacaoId: string;
    acao: string;
    detalhes: Record<string, any>;
    usuarioId: string;
    createdAt: Date;
    
    // Relacionamentos
    usuario?: Pick<User, 'id' | 'nome' | 'avatar'>;
}

export interface CreateNegotiationPayload {
    vehicleId: string;
    precoOfertado: number;
    comentario?: string;
}

export interface AddMessagePayload {
    conteudo: string;
    tipo?: MessageType;
}

export interface RespondNegotiationPayload {
    action: 'ACCEPT' | 'REJECT' | 'COUNTER';
    precoNegociado?: number;
    motivo?: string;
}