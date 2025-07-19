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
    error: string | null;
    
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
    clearError: () => void;
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
        error: null,

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
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao criar negociação',
                isLoading: false
            });
            throw error;
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
                isLoading: false
            });
            }
        },

        fetchNegotiationById: async (id) => {
            set({ isLoading: true, error: null });
            try {
            const negotiation = await negotiationService.getById(id);
            set({ 
                currentNegotiation: negotiation,
                isLoading: false 
            });
            } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao buscar negociação',
                isLoading: false
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
            } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao responder negociação',
                isLoading: false
            });
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
            } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao cancelar negociação',
                isLoading: false
            });
            }
        },

        fetchMessages: async (negotiationId) => {
            set({ isLoading: true, error: null });
            try {
            const messages = await negotiationService.getMessages(negotiationId);
            set({ messages, isLoading: false });
            } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao buscar mensagens',
                isLoading: false
            });
            }
        },

        fetchHistory: async (negotiationId) => {
            set({ isLoading: true, error: null });
            try {
            const history = await negotiationService.getHistory(negotiationId);
            set({ history, isLoading: false });
            } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Erro ao buscar histórico',
                isLoading: false
            });
            }
        },

        resetCurrentNegotiation: () => {
            set({ 
            currentNegotiation: null,
            messages: [],
            history: []
            });
        },

        clearError: () => {
            set({ error: null });
        }
        }),
        { name: 'NegotiationStore' }
    )
);