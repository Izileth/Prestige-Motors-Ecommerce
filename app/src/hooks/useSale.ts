import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/src/store/hooks';
import * as saleActions from '~/src/store/slices/sales';
import type { SaleData, UpdateSaleData, Sale } from '../types/sale';

const useSale = () => {
    const dispatch = useAppDispatch();
    const saleState = useAppSelector((state) => state.sales);
        
    const loadingStates = useMemo(() => ({
        creating: saleState.loading && saleState.currentSale === null,
        updating: saleState.loading && saleState.currentSale !== null,
        fetchingStats: saleState.loading && saleState.stats.global === null,
        fetchingTransactions: saleState.loading && saleState.transactions.asBuyer.length === 0 
                            && saleState.transactions.asSeller.length === 0
    }), [saleState]);
    
    const getUserTransactions = async (userId: string) => {
        try {
            return await dispatch(saleActions.fetchUserTransactions(userId)).unwrap();
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            throw error;
        }
    };

    return {
        ...saleState,
        loadingStates,

        // Operações CRUD
        createSale: async (data: SaleData) => {
            try {
                return await dispatch(saleActions.createSale(data)).unwrap();
            } catch (error) {
                console.error("Failed to create sale:", error);
                throw error;
            }
        },
        
        fetchSaleById: (id: string) => dispatch(saleActions.fetchSaleById(id)),
        updateSale: (id: string, data: UpdateSaleData) => 
            dispatch(saleActions.updateSale({ id, data })),

        // Históricos
        fetchPurchasesByUser: (userId: string) => 
            dispatch(saleActions.fetchPurchasesByUser(userId)),
        
        fetchSalesBySeller: (userId: string) => 
            dispatch(saleActions.fetchSalesBySeller(userId)),
            
        fetchSalesByVehicle: (vehicleId: string) => 
            dispatch(saleActions.fetchSalesByVehicle(vehicleId)),
            
        getUserTransactions,

        // Estatísticas
        fetchGlobalSalesStats: () => dispatch(saleActions.fetchGlobalSalesStats()),
        fetchUserSalesStats: (userId: string) => 
            dispatch(saleActions.fetchUserSalesStats(userId)),
        clearStats: () => dispatch(saleActions.clearStats()),

        // Utilitários
        resetSaleState: () => dispatch(saleActions.resetSaleState()),
        setCurrentSale: (sale: Sale | null) => 
            dispatch(saleActions.setCurrentSale(sale)),
        clearAll: () => {
            dispatch(saleActions.clearStats());
            dispatch(saleActions.resetSaleState());
        }
    };
};

export default useSale;