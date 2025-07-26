import { useEffect, useMemo } from 'react';
import { useNegotiationStore } from '../store/slices/negociation';
import type { NegotiationStatus } from '../types/negociation';

export const useNegotiations = (options?: {
    status?: NegotiationStatus;
    autoFetch?: boolean;
    negotiationId?: string;
    withMessages?: boolean;
    withHistory?: boolean;
    }) => {
    const {
        status = undefined,
        autoFetch = true,
        negotiationId,
        withMessages = false,
        withHistory = false
    } = options || {};

    

    // Obtém estados e ações do store
    const {
        negotiations,
        currentNegotiation,
        messages,
        history,
        isLoading,
        error,
        fetchNegotiations,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        resetCurrentNegotiation,
        clearErrors
    } = useNegotiationStore();

    // Memoriza as negociações filtradas por status
    const filteredNegotiations = useMemo(() => {
        if (!status) return negotiations;
        return negotiations.filter(n => n.status === status);
    }, [negotiations, status]);
     
    const availableMessages = useMemo(() => {
        if (negotiationId && currentNegotiation?.mensagens) {
            return currentNegotiation.mensagens;
        }
        return messages;
    }, [negotiationId, currentNegotiation?.mensagens, messages]);


    // Carrega negociações automaticamente quando necessário
    useEffect(() => {
        if (autoFetch && !negotiationId) {
        fetchNegotiations(status);
        }
    }, [autoFetch, fetchNegotiations, negotiationId, status]);

    // Carrega uma negociação específica quando o ID muda
    useEffect(() => {
        if (autoFetch && negotiationId) {
        fetchNegotiationById(negotiationId);
        
        if (withMessages) {
            fetchMessages(negotiationId);
        }
        
        if (withHistory) {
            fetchHistory(negotiationId);
        }
        }

        return () => {
        if (negotiationId) {
            resetCurrentNegotiation();
        }
        };
    }, [
        autoFetch, 
        negotiationId, 
        withMessages, 
        withHistory,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        resetCurrentNegotiation
    ]);

    return {
        // Estados
        negotiations: filteredNegotiations,
        currentNegotiation,
        messages: availableMessages,
        history,
        isLoading,
        error,
        
        // Ações
        fetchNegotiations: () => fetchNegotiations(status),
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        clearErrors,
        
        // Utilitários
        isEmpty: !isLoading && filteredNegotiations.length === 0,
        getNegotiationById: (id: string) => negotiations.find(n => n.id === id)
    };
};