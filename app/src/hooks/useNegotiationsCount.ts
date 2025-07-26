
import { useNegotiationStore } from "~/src/store/slices/negociation";
import { useAuth } from "~/src/hooks/useAuth";
import { useMemo, useEffect, useCallback } from "react";

export const useNegotiationsCount = () => {
    const { user, isAuthenticated } = useAuth();
    
    // Acessar dados e ações do store
    const negotiations = useNegotiationStore((state) => state.negotiations);
    const loading = useNegotiationStore((state) => state.isLoading);
    const error = useNegotiationStore((state) => state.error);
    const fetchNegotiations = useNegotiationStore((state) => state.fetchNegotiations);
    const clearNegotiations = useNegotiationStore((state) => state.clearErrors);
    
    // Função para buscar negociações do usuário
    const loadUserNegotiations = useCallback(async () => {
        if (!user?.id) return;
        
        try {
            await fetchNegotiations();
        } catch (error) {
            console.error("Erro ao carregar negociações:", error);
        }
    }, [user?.id, fetchNegotiations]);
    
    // Auto-inicialização quando usuário loga
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            console.log("Usuário autenticado, carregando negociações...");
            loadUserNegotiations();
        } else if (!isAuthenticated) {
            // Limpar dados quando usuário desloga
            clearNegotiations();
        }
    }, [isAuthenticated, user?.id, loadUserNegotiations, clearNegotiations]);
    
    // Calcula diferentes contadores
    const counts = useMemo(() => {
        if (!negotiations || !Array.isArray(negotiations)) {
            return {
                total: 0,
                active: 0,
                pending: 0,
                accepted: 0,
                rejected: 0,
            };
        }

        return {
            total: negotiations.length,
            active: negotiations.filter(n => ['ABERTA', 'CONTRA_OFERTA'].includes(n.status)).length,
            pending: negotiations.filter(n => n.status === 'ABERTA').length,
            accepted: negotiations.filter(n => n.status === 'ACEITA').length,
            rejected: negotiations.filter(n => n.status === 'RECUSADA').length,
        };
    }, [negotiations]);

    return {
        ...counts,
        negotiations,
        loading,
        error,
        refresh: loadUserNegotiations,
        isAuthenticated
    };
};

// Hook alternativo caso você queira apenas o total
export const useTotalNegotiationsCount = () => {
    const { user, isAuthenticated } = useAuth();
    const negotiations = useNegotiationStore((state) => state.negotiations);
    const fetchNegotiations = useNegotiationStore((state) => state.fetchNegotiations);
    
    // Auto-carregar se não houver dados e usuário estiver logado
    useEffect(() => {
        if (isAuthenticated && user?.id && (!negotiations || negotiations.length === 0)) {
            fetchNegotiations();
        }
    }, [isAuthenticated, user?.id, negotiations, fetchNegotiations]);
    
    return negotiations?.length || 0;
};

// Hook para contar negociações por status específico
export const useNegotiationsByStatus = (status?: string) => {
    const { user, isAuthenticated } = useAuth();
    const negotiations = useNegotiationStore((state) => state.negotiations);
    const fetchNegotiations = useNegotiationStore((state) => state.fetchNegotiations);
    
    // Auto-carregar se necessário
    useEffect(() => {
        if (isAuthenticated && user?.id && (!negotiations || negotiations.length === 0)) {
            fetchNegotiations();
        }
    }, [isAuthenticated, user?.id, negotiations, fetchNegotiations]);
    
    return useMemo(() => {
        if (!negotiations || !Array.isArray(negotiations)) return 0;
        
        if (!status) return negotiations.length;
        
        return negotiations.filter(n => n.status === status).length;
    }, [negotiations, status]);
};