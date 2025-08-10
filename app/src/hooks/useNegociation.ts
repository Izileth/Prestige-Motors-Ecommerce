import { useEffect, useMemo, useCallback, useRef } from 'react';
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

    // ✨ Ref para controlar se é a primeira montagem
    const isFirstMount = useRef(true);
    const hasAttemptedFetch = useRef(false);

    // Obtém estados e ações do store
    const {
        negotiations,
        currentNegotiation,
        messages,
        history,
        isLoading,
        error,
        hasInitialized, // ✨ NOVO estado
        fetchNegotiations: storeFetchNegotiations,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        resetCurrentNegotiation,
        clearErrors,
        resetErrorsOnNavigation // ✨ NOVA ação
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

    // ✨ Limpa erros quando o hook é montado (mudança de aba)
    useEffect(() => {
        if (isFirstMount.current) {
            resetErrorsOnNavigation();
            isFirstMount.current = false;
        }
    }, [resetErrorsOnNavigation]);

    // Cria função memorizada para fetchNegotiations
    const fetchNegotiationsWithStatus = useCallback(() => {
        hasAttemptedFetch.current = true;
        return storeFetchNegotiations(status);
    }, [storeFetchNegotiations, status]);

    // ✨ Carrega negociações com debounce para evitar múltiplas chamadas
    useEffect(() => {
        if (!autoFetch || negotiationId) return;

        // ✨ Pequeno delay para evitar toast de erro em mudanças rápidas de aba
        const timeoutId = setTimeout(() => {
            fetchNegotiationsWithStatus();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [autoFetch, negotiationId, fetchNegotiationsWithStatus]);

    // Carrega uma negociação específica quando o ID muda
    useEffect(() => {
        if (!autoFetch || !negotiationId) return;

        // Função para carregar dados da negociação
        const loadNegotiationData = async () => {
            try {
                await fetchNegotiationById(negotiationId);
                
                // Carrega mensagens e histórico em paralelo se necessário
                const promises = [];
                
                if (withMessages) {
                    promises.push(fetchMessages(negotiationId));
                }
                
                if (withHistory) {
                    promises.push(fetchHistory(negotiationId));
                }
                
                if (promises.length > 0) {
                    await Promise.allSettled(promises);
                }
            } catch (error) {
                console.error('Erro ao carregar dados da negociação:', error);
            }
        };

        loadNegotiationData();

        // Cleanup quando o componente desmonta ou o ID muda
        return () => {
            resetCurrentNegotiation();
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

    // ✨ Determina se deve mostrar erro (só após primeira tentativa)
    const shouldShowError = useMemo(() => {
        return error && hasAttemptedFetch.current && (hasInitialized || !isLoading);
    }, [error, isLoading, hasInitialized]);

    return {
        // Estados
        negotiations: filteredNegotiations,
        currentNegotiation,
        messages: availableMessages,
        history,
        isLoading,
        error: shouldShowError ? error : null, // ✨ Só mostra erro quando apropriado
        hasInitialized,

        // Ações
        fetchNegotiations: fetchNegotiationsWithStatus,
        fetchNegotiationById,
        fetchMessages,
        fetchHistory,
        clearErrors,

        // Utilitários
        isEmpty: !isLoading && filteredNegotiations.length === 0,
        getNegotiationById: (id: string) => negotiations.find(n => n.id === id)
    };
};