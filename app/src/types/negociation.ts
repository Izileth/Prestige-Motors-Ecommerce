import type { Vehicle } from "./vehicle";
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

export interface NegotiationMessage {
    id: string;
    autorId: string;
    conteudo: string;
    tipo: MessageType;
    createdAt: string; // Backend retorna string, não Date
    // Relacionamentos
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