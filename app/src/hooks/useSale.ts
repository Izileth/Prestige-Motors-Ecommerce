import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/src/store/hooks';
import * as saleActions from '~/src/store/slices/sales';
import type { SaleData, UpdateSaleData, Sale } from '../types/sale';

const useSale = () => {
    const dispatch = useAppDispatch();
    const saleState = useAppSelector((state) => state.sales);
    
    // Estados de loading mais específicos e precisos
    const loadingStates = useMemo(() => ({
        creating: saleState.loading && saleState.currentSale === null,
        updating: saleState.loading && saleState.currentSale !== null,
        fetchingStats: saleState.loading && saleState.stats.global === null,
        fetchingUserStats: saleState.loading && saleState.stats.user === null,
        fetchingTransactions: saleState.loading && 
            saleState.transactions.asBuyer.length === 0 && 
            saleState.transactions.asSeller.length === 0,
        fetchingPurchases: saleState.loading && saleState.purchases.length === 0,
        fetchingSellerSales: saleState.loading && saleState.sellerSales.length === 0,
        fetchingVehicleSales: saleState.loading && saleState.vehicleSales.length === 0,
        fetchingSale: saleState.loading && saleState.currentSale === null,
        general: saleState.loading
    }), [saleState]);

    // Operações CRUD
    const createSale = async (data: SaleData) => {
        try {
            return await dispatch(saleActions.createSale(data)).unwrap();
        } catch (error) {
            console.error("Failed to create sale:", error);
            throw error;
        }
    };

    const fetchSaleById = async (id: string) => {
        try {
            return await dispatch(saleActions.fetchSaleById(id)).unwrap();
        } catch (error) {
            console.error("Failed to fetch sale:", error);
            throw error;
        }
    };

    const updateSale = async (id: string, data: UpdateSaleData) => {
        try {
            return await dispatch(saleActions.updateSale({ id, data })).unwrap();
        } catch (error) {
            console.error("Failed to update sale:", error);
            throw error;
        }
    };

    // Históricos
    const fetchPurchasesByUser = async (userId: string) => {
        try {
            return await dispatch(saleActions.fetchPurchasesByUser(userId)).unwrap();
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
            throw error;
        }
    };

    const fetchSalesBySeller = async (userId: string) => {
        try {
            return await dispatch(saleActions.fetchSalesBySeller(userId)).unwrap();
        } catch (error) {
            console.error("Failed to fetch seller sales:", error);
            throw error;
        }
    };

    const fetchSalesByVehicle = async (vehicleId: string) => {
        try {
            return await dispatch(saleActions.fetchSalesByVehicle(vehicleId)).unwrap();
        } catch (error) {
            console.error("Failed to fetch vehicle sales:", error);
            throw error;
        }
    };

    const getUserTransactions = async (userId: string) => {
        try {
            return await dispatch(saleActions.fetchUserTransactions(userId)).unwrap();
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            throw error;
        }
    };

    // Estatísticas
    const fetchGlobalSalesStats = async () => {
        try {
            return await dispatch(saleActions.fetchGlobalSalesStats()).unwrap();
        } catch (error) {
            console.error("Failed to fetch global stats:", error);
            throw error;
        }
    };

    const fetchUserSalesStats = async (userId: string) => {
        try {
            return await dispatch(saleActions.fetchUserSalesStats(userId)).unwrap();
        } catch (error) {
            console.error("Failed to fetch user stats:", error);
            throw error;
        }
    };

    // Utilitários
    const clearStats = () => dispatch(saleActions.clearStats());
    const resetSaleState = () => dispatch(saleActions.resetSaleState());
    const setCurrentSale = (sale: Sale | null) => dispatch(saleActions.setCurrentSale(sale));
    const clearError = () => dispatch(saleActions.clearError());
    const clearSuccess = () => dispatch(saleActions.clearSuccess());

    const clearAll = () => {
        dispatch(saleActions.clearStats());
        dispatch(saleActions.resetSaleState());
    };

    return {
        // Estado
        ...saleState,
        loadingStates,
        
        // Operações CRUD
        createSale,
        fetchSaleById,
        updateSale,
        
        // Históricos
        fetchPurchasesByUser,
        fetchSalesBySeller,
        fetchSalesByVehicle,
        getUserTransactions,
        
        // Estatísticas
        fetchGlobalSalesStats,
        fetchUserSalesStats,
        
        // Utilitários
        clearStats,
        resetSaleState,
        setCurrentSale,
        clearError,
        clearSuccess,
        clearAll
    };
};

export default useSale;