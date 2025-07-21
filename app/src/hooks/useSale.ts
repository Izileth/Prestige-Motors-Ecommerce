import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/src/store/hooks';
import * as saleActions from '~/src/store/slices/sales';
import type { SaleData, UpdateSaleData, Sale } from '../types/sale';

const useSale = () => {
    const dispatch = useAppDispatch();
    const saleState = useAppSelector((state) => state.sales);
    

    const loadingStates = useMemo(() => ({
        ...saleState.loadingStates,
        // Manter compatibilidade com o código anterior
        general: Object.values(saleState.loadingStates).some(loading => loading)
    }), [saleState.loadingStates]);

    // Operações CRUD
    const createSale = async (data: SaleData) => {
        try {
            console.log('🚀 Creating sale:', data);
            const result = await dispatch(saleActions.createSale(data)).unwrap();
            console.log('✅ Sale created:', result);
            return result;
        } catch (error) {
            console.error("❌ Failed to create sale:", error);
            throw error;
        }
    };

    const fetchSaleById = async (id: string) => {
        try {
            console.log('🔍 Fetching sale:', id);
            const result = await dispatch(saleActions.fetchSaleById(id)).unwrap();
            console.log('✅ Sale fetched:', result);
            return result;
        } catch (error) {
            console.error("❌ Failed to fetch sale:", error);
            throw error;
        }
    };

    const updateSale = async (id: string, data: UpdateSaleData) => {
        try {
            console.log('🔄 Updating sale:', id, data);
            const result = await dispatch(saleActions.updateSale({ id, data })).unwrap();
            console.log('✅ Sale updated:', result);
            return result;
        } catch (error) {
            console.error("❌ Failed to update sale:", error);
            throw error;
        }
    };

    // Históricos
    const fetchPurchasesByUser = async (userId: string) => {
        try {
            console.log('🛒 Fetching purchases for user:', userId);
            return await dispatch(saleActions.fetchPurchasesByUser(userId)).unwrap();
        } catch (error) {
            console.error("❌ Failed to fetch purchases:", error);
            throw error;
        }
    };

    const fetchSalesBySeller = async (userId: string) => {
        try {
            console.log('💼 Fetching sales by seller:', userId);
            return await dispatch(saleActions.fetchSalesBySeller(userId)).unwrap();
        } catch (error) {
            console.error("❌ Failed to fetch seller sales:", error);
            throw error;
        }
    };

    const fetchSalesByVehicle = async (vehicleId: string) => {
        try {
            console.log('🚗 Fetching sales by vehicle:', vehicleId);
            return await dispatch(saleActions.fetchSalesByVehicle(vehicleId)).unwrap();
        } catch (error) {
            console.error("❌ Failed to fetch vehicle sales:", error);
            throw error;
        }
    };

    const getUserTransactions = async (userId: string) => {
        try {
            console.log('📊 Fetching transactions for user:', userId);
            return await dispatch(saleActions.fetchUserTransactions(userId)).unwrap();
        } catch (error) {
            console.error('❌ Failed to fetch transactions:', error);
            throw error;
        }
    };

    // Estatísticas
    const fetchGlobalSalesStats = async () => {
        try {
            console.log('🌍 Fetching global stats');
            return await dispatch(saleActions.fetchGlobalSalesStats()).unwrap();
        } catch (error) {
            console.error("❌ Failed to fetch global stats:", error);
            throw error;
        }
    };

    const fetchUserSalesStats = async (userId: string) => {
        try {
            console.log('👤 Fetching user stats:', userId);
            return await dispatch(saleActions.fetchUserSalesStats(userId)).unwrap();
        } catch (error) {
            console.error("❌ Failed to fetch user stats:", error);
            throw error;
        }
    };

    // Utilitários
    const clearStats = () => {
        console.log('🧹 Clearing stats');
        dispatch(saleActions.clearStats());
    };
    
    const resetSaleState = () => {
        console.log('🔄 Resetting sale state');
        dispatch(saleActions.resetSaleState());
    };
    
    const setCurrentSale = (sale: Sale | null) => {
        console.log('🎯 Setting current sale:', sale?.id);
        dispatch(saleActions.setCurrentSale(sale));
    };
    
    const clearError = () => {
        console.log('❌🧹 Clearing error');
        dispatch(saleActions.clearError());
    };
    
    const clearSuccess = () => {
        console.log('✅🧹 Clearing success');
        dispatch(saleActions.clearSuccess());
    };

    const clearAll = () => {
        console.log('🧹 Clearing all state');
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