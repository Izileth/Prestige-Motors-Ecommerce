import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { negotiationService } from '~/src/services/negociation';
import type { NegotiationStatus, NegotiationHistory, NegotiationMessage, Negotiation, CreateNegotiationPayload, AddMessagePayload, RespondNegotiationPayload } from '~/src/types/negociation';

interface NegotiationStore {
    // Estado
    negotiations: Negotiation[];
    currentNegotiation: Negotiation | null;
    messages: NegotiationMessage[];
    history: NegotiationHistory[];
    isLoading: boolean;
    isFetchingMessages: boolean;
    isFetchingHistory: boolean;
    error: string | null;
    messagesError: string | null;
    historyError: string | null;
    
    // Ações
    createNegotiation: (payload: CreateNegotiationPayload) => Promise<Negotiation>;
    fetchNegotiations: (status?: NegotiationStatus) => Promise<void>;
    fetchNegotiationById: (id: string) => Promise<void>;
    addMessage: (negotiationId: string, payload: AddMessagePayload) => Promise<void>;
    respondToNegotiation: (negotiationId: string, payload: RespondNegotiationPayload) => Promise<void>;
    cancelNegotiation: (id: string) => Promise<void>;
    fetchMessages: (negotiationId: string) => Promise<void>;
    fetchHistory: (negotiationId: string) => Promise<void>;
    resetCurrentNegotiation: () => void;
    clearErrors: () => void;
}

export const useNegotiationStore = create<NegotiationStore>()(
    devtools(
        (set, get) => ({
        // Estado inicial
        negotiations: [],
        currentNegotiation: null,
        messages: [],
        history: [],
        isLoading: false,
        isFetchingMessages: false,
        isFetchingHistory: false,
        error: null,
        messagesError: null,
        historyError: null,

        // Ações
        createNegotiation: async (payload) => {
            set({ isLoading: true, error: null });
            try {
                const newNegotiation = await negotiationService.create(payload);
                set(state => ({
                    negotiations: [newNegotiation, ...state.negotiations],
                    isLoading: false
                }));
                return newNegotiation;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Erro ao criar negociação';
                set({ 
                    error: errorMessage,
                    isLoading: false
                });
                throw new Error(errorMessage);
            }
        },

        fetchNegotiations: async (status) => {
            set({ isLoading: true, error: null });
            try {
                const negotiations = await negotiationService.getAll(status);
                set({ negotiations, isLoading: false });
            } catch (error) {
                set({ 
                    error: error instanceof Error ? error.message : 'Erro ao buscar negociações',
                    isLoading: false,
                    negotiations: [] // Reset para evitar mostrar dados inconsistentes
                });
            }
        },
    
        fetchNegotiationById: async (id) => {
            set({ 
                isLoading: true, 
                error: null,
                messagesError: null,
                historyError: null
            });
            try {
                const negotiation = await negotiationService.getById(id);
                const negotiationMessages = negotiation.mensagens || [];
                
                set({ 
                    currentNegotiation: negotiation,
                    messages: negotiationMessages,
                    isLoading: false 
                });
                
                // Carrega histórico em segundo plano
                get().fetchHistory(id).catch(console.error);
            } catch (error) {
                set({ 
                    error: error instanceof Error ? error.message : 'Erro ao buscar negociação',
                    isLoading: false,
                    currentNegotiation: null
                });
            }
        },

        addMessage: async (negotiationId, payload) => {
            set({ isLoading: true, error: null });
            try {
                const newMessage = await negotiationService.addMessage(negotiationId, payload);
                set(state => ({
                    messages: [...state.messages, newMessage],
                    currentNegotiation: state.currentNegotiation ? {
                        ...state.currentNegotiation,
                        updatedAt: new Date()
                    } : null,
                    isLoading: false
                }));
            } catch (error) {
                set({ 
                    error: error instanceof Error ? error.message : 'Erro ao enviar mensagem',
                    isLoading: false
                });
                throw error; // Re-throw para permitir tratamento no componente
            }
        },

        respondToNegotiation: async (negotiationId, payload) => {
            set({ isLoading: true, error: null });
            try {
                const updatedNegotiation = await negotiationService.respond(negotiationId, payload);
                
                set(state => ({
                    negotiations: state.negotiations.map(n => 
                        n.id === negotiationId ? updatedNegotiation : n
                    ),
                    currentNegotiation: updatedNegotiation,
                    isLoading: false
                }));
                
                // Atualiza o histórico após resposta
                await get().fetchHistory(negotiationId);
            } catch (error) {
                set({ 
                    error: error instanceof Error ? error.message : 'Erro ao responder negociação',
                    isLoading: false
                });
                throw error;
            }
        },

        cancelNegotiation: async (id) => {
            set({ isLoading: true, error: null });
            try {
                const updatedNegotiation = await negotiationService.cancel(id);
                set(state => ({
                    negotiations: state.negotiations.map(n => 
                        n.id === id ? updatedNegotiation : n
                    ),
                    currentNegotiation: updatedNegotiation,
                    isLoading: false
                }));
                
                // Atualiza o histórico após cancelamento
                await get().fetchHistory(id);
            } catch (error) {
                set({ 
                    error: error instanceof Error ? error.message : 'Erro ao cancelar negociação',
                    isLoading: false
                });
                throw error;
            }
        },

        fetchMessages: async (negotiationId) => {
            set({ isFetchingMessages: true, messagesError: null });
            try {
                const messages = await negotiationService.getMessages(negotiationId);
                set({ 
                    messages,
                    isFetchingMessages: false 
                });
            } catch (error) {
                set({ 
                    messagesError: error instanceof Error ? error.message : 'Erro ao buscar mensagens',
                    isFetchingMessages: false,
                    messages: [] // Limpa mensagens para evitar inconsistência
                });
                
                // Mantemos as mensagens existentes se já tivermos alguma
                if (get().messages.length > 0) {
                    set({ isFetchingMessages: false });
                }
            }
        },

        fetchHistory: async (negotiationId) => {
            set({ isFetchingHistory: true, historyError: null });
            try {
                const history = await negotiationService.getHistory(negotiationId);
                set({ 
                    history,
                    isFetchingHistory: false 
                });
            } catch (error) {
                set({ 
                    historyError: error instanceof Error ? error.message : 'Erro ao buscar histórico',
                    isFetchingHistory: false,
                    history: [] // Limpa histórico para evitar inconsistência
                });
                
                // Mantemos o histórico existente se já tivermos algum
                if (get().history.length > 0) {
                    set({ isFetchingHistory: false });
                }
            }
        },

        resetCurrentNegotiation: () => {
            set({ 
                currentNegotiation: null,
                messages: [],
                history: [],
                messagesError: null,
                historyError: null
            });
        },

        clearErrors: () => {
            set({ 
                error: null,
                messagesError: null,
                historyError: null 
            });
        }
        }),
        { name: 'NegotiationStore' }
    )
);