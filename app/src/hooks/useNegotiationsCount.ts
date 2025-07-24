// hooks/useNegotiationsCount.ts
import { useNegotiationStore } from "~/src/store/slices/negociation";
import { useMemo } from "react";

export const useNegotiationsCount = () => {
    // Assumindo que o store tem uma lista de negociações
    const negotiations = useNegotiationStore((state) => state.negotiations);
    
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

    return counts;
};

// Hook alternativo caso você queira apenas o total
export const useTotalNegotiationsCount = () => {
    return useNegotiationStore((state) => state.negotiations?.length || 0);
};

// Hook para contar negociações por status específico
export const useNegotiationsByStatus = (status?: string) => {
    const negotiations = useNegotiationStore((state) => state.negotiations);
    
    return useMemo(() => {
        if (!negotiations || !Array.isArray(negotiations)) return 0;
        
        if (!status) return negotiations.length;
        
        return negotiations.filter(n => n.status === status).length;
    }, [negotiations, status]);
};