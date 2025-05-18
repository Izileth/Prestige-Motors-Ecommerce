// useNegotiation.ts
import { useNegotiationStore } from "~/store/slices/negociation";

const useNegotiation = () => {
    // Obtém todo o estado e ações do store de negociações
    const negotiationStore = useNegotiationStore();

    return {
        // Estado
        negotiations: negotiationStore.negotiations,
        loading: negotiationStore.loading,
        error: negotiationStore.error,
        success: negotiationStore.success,
        
        // Ações
        createNegotiation: async (vehicleId: string, message: string) => {
        try {
            return await negotiationStore.createNegotiation(vehicleId, message);
        } catch (error) {
            console.error('Negotiation error:', error);
            throw error;
        }
        },
        
        fetchUserNegotiations: async () => {
        try {
            await negotiationStore.fetchUserNegotiations();
        } catch (error) {
            console.error('Fetch negotiations error:', error);
            throw error;
        }
        },
        
        clearNegotiations: negotiationStore.clearNegotiations
    };
    };

export default useNegotiation;