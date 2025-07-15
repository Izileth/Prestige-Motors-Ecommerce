
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import negociationsService from '~/src/services/negociation';
import type { Negotiation } from '~/src/types/negociation';

interface NegotiationState {
  negotiations: Negotiation[];
  loading: boolean;
  error: string | null;
  success: boolean;
  
  // Ações
  createNegotiation: (vehicleId: string, message: string) => Promise<Negotiation>;
  fetchUserNegotiations: () => Promise<void>;
  clearNegotiations: () => void;
  
  // Para integração com Redux
  setNegotiationsFromRedux: (negotiations: Negotiation[]) => void;
}

export const useNegotiationStore = create<NegotiationState>()(
    persist(
        (set, get) => ({
        negotiations: [],
        loading: false,
        error: null,
        success: false,

        createNegotiation: async (vehicleId, message) => {
            set({ loading: true, error: null, success: false });
            try {
            const negotiation = await negociationsService.createNegotiation(vehicleId, message);
            set(state => ({
                negotiations: [negotiation, ...state.negotiations],
                loading: false,
                success: true
            }));
            return negotiation;
            } catch (error) {
            set({ 
                loading: false, 
                error: error instanceof Error ? error.message : 'Failed to create negotiation' 
            });
            throw error;
            }
        },

        fetchUserNegotiations: async () => {
            set({ loading: true, error: null });
            try {
            const negotiations = await negociationsService.getUserNegotiations();
            set({ negotiations, loading: false });
            } catch (error) {
            set({ 
                loading: false, 
                error: error instanceof Error ? error.message : 'Failed to fetch negotiations' 
            });
            }
        },

        clearNegotiations: () => {
            set({ negotiations: [], error: null });
        },

        setNegotiationsFromRedux: (negotiations) => {
            set({ negotiations });
        }
        }),
        {
        name: 'negotiation-storage',
        partialize: (state) => ({
            negotiations: state.negotiations
        }),
        }
    )
);