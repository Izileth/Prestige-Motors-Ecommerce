import { useMemo } from 'react';
import { useSaleStore } from '../store/slices/sales';
import type { SaleData, UpdateSaleData, Sale } from '../types/sale';

const useSale = () => {
    const {
        // Estado
        sales,
        purchases,
        sellerSales,
        vehicleSales,
        currentSale,
        stats,
        transactions,
        loadingStates,
        error,
        success,
        
        // Ações
        createSale: createSaleAction,
        fetchSaleById: fetchSaleByIdAction,
        updateSale: updateSaleAction,
        fetchPurchasesByUser,
        fetchSalesBySeller,
        fetchSalesByVehicle,
        fetchUserTransactions,
        fetchGlobalSalesStats,
        fetchUserSalesStats,
        clearStats,
        resetSaleState,
        setCurrentSale,
        clearError,
        clearSuccess
    } = useSaleStore();

    // Adiciona o loading geral mantendo compatibilidade
    const enhancedLoadingStates = useMemo(() => ({
        ...loadingStates,
        general: Object.values(loadingStates).some(loading => loading)
    }), [loadingStates]);

    // Operações CRUD com tratamento de erro e logging
    const createSale = async (data: SaleData) => {
        try {
            console.log('🚀 Creating sale:', data);
            await createSaleAction(data);
            console.log('✅ Sale created successfully');
        } catch (error) {
            console.error("❌ Failed to create sale:", error);
            throw error;
        }
  
    };

    const fetchSaleById = async (id: string) => {
        try {
            console.log('🔍 Fetching sale:', id);
            await fetchSaleByIdAction(id);
            console.log('✅ Sale fetched successfully');
        } catch (error) {
            console.error("❌ Failed to fetch sale:", error);
            throw error;
        }
    };

    const updateSale = async (id: string, data: UpdateSaleData) => {
        try {
            console.log('🔄 Updating sale:', id, data);
            await updateSaleAction(id, data);
            console.log('✅ Sale updated successfully');
        } catch (error) {
            console.error("❌ Failed to update sale:", error);
            throw error;
        }
    };

    // Históricos com tratamento de erro
    const getUserTransactions = async (userId: string) => {
        try {
            console.log('📊 Fetching transactions for user:', userId);
            await fetchUserTransactions(userId);
            console.log('✅ Transactions fetched successfully');
        } catch (error) {
            console.error('❌ Failed to fetch transactions:', error);
            throw error;
        }
    };

    // Utilitário combinado
    const clearAll = () => {
        console.log('🧹 Clearing all state');
        clearStats();
        resetSaleState();
    };

    return {
        // Estado
        sales,
        purchases,
        sellerSales,
        vehicleSales,
        currentSale,
        stats,
        transactions,
        loadingStates: enhancedLoadingStates,
        error,
        success,
        
        // Operações CRUD
        createSale,
        fetchSaleById,
        updateSale,
        
        // Históricos
        fetchPurchasesByUser: fetchPurchasesByUser,
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