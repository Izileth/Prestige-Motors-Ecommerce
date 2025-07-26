import api from "./api";
import type { 
    Negotiation, 
    NegotiationMessage, 
    NegotiationHistory,
    CreateNegotiationPayload,
    AddMessagePayload,
    RespondNegotiationPayload
} from "../types/negociation";


export const negotiationService = {
    /**
     * Cria uma nova negociação
     */
    async create(payload: CreateNegotiationPayload): Promise<Negotiation> {
        const response = await api.post('/negotiations', payload);
        return response.data;
    },

    /**
     * Lista todas as negociações do usuário logado
     */
    async getAll(status?: string): Promise<Negotiation[]> {
        const params = status ? { status } : {};
        const response = await api.get('/negotiations/user', { params });
        console.log( 'Negociações Encontradas!', response.data);
        return response.data.data;
    },

    /**
     * Obtém os detalhes de uma negociação específica
     */
    async getById(negotiationId: string): Promise<Negotiation> {
        const response = await api.get(`/negotiations/${negotiationId}`);
        console.log( 'Negociação Encontrada!', response.data);
        return response.data;
    },

    /**
     * Adiciona uma mensagem à negociação
     */
    async addMessage(
        negotiationId: string, 
        payload: AddMessagePayload
    ): Promise<NegotiationMessage> {
        const response = await api.post(
            `/negotiations/${negotiationId}/menssages`, 
            payload
        );
        return response.data;
    },

    /**
     * Responde à negociação (aceitar, recusar ou fazer contraproposta)
     */
    async respond(
        negotiationId: string, 
        payload: RespondNegotiationPayload
    ): Promise<Negotiation> {
        const response = await api.put(
            `/negotiations/${negotiationId}/respond`, 
            payload
        );
        return response.data;
    },

    /**
     * Cancela uma negociação
     */
    async cancel(negotiationId: string): Promise<Negotiation> {
        const response = await api.delete(`/negotiations/${negotiationId}`);
        return response.data;
    },

    /**
     * Obtém o histórico de uma negociação
     */
    async getHistory(negotiationId: string): Promise<NegotiationHistory[]> {
        const response = await api.get(`/negotiations/${negotiationId}/history`);
        return response.data;
    },

    /**
     * Lista as mensagens de uma negociação
     */
    async getMessages(negotiationId: string): Promise<NegotiationMessage[]> {
        const response = await api.get(`/negotiations/${negotiationId}/messages`);
        return response.data;
    }
};

export default negotiationService;