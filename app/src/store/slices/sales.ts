import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saleService } from '~/src/services/sale';
import type { Sale, SaleData, SaleStats, UpdateSaleData, UserSaleStats } from '~/src/types/sale';
import type { UserTransactionsResponse } from '~/src/types/transactions';
interface SaleStoreState {
    sales: Sale[];
    purchases: Sale[];
    sellerSales: Sale[];
    vehicleSales: Sale[];
    currentSale: Sale | null;
    stats: {
        global: SaleStats | null;
        user: UserSaleStats | null;
    };
    loadingStates: {
        creating: boolean;
        updating: boolean;
        fetchingSale: boolean;
        fetchingStats: boolean;
        fetchingUserStats: boolean;
        fetchingTransactions: boolean;
        fetchingPurchases: boolean;
        fetchingSellerSales: boolean;
        fetchingVehicleSales: boolean;
    };
    error: string | null;
    success: boolean;
    transactions: UserTransactionsResponse;
}

interface SaleStoreActions {
    createSale: (data: SaleData) => Promise<void>;
    fetchSaleById: (id: string) => Promise<void>;
    updateSale: (id: string, data: UpdateSaleData) => Promise<void>;
    fetchUserTransactions: (userId: string) => Promise<void>;
    fetchPurchasesByUser: (userId: string) => Promise<void>;
    fetchSalesBySeller: (userId: string) => Promise<void>;
    fetchSalesByVehicle: (vehicleId: string) => Promise<void>;
    fetchGlobalSalesStats: () => Promise<void>;
    fetchUserSalesStats: (userId: string) => Promise<void>;
    resetSaleState: () => void;
    setCurrentSale: (sale: Sale | null) => void;
    clearStats: () => void;
    clearError: () => void;
    clearSuccess: () => void;
}

const initialState: SaleStoreState = {
    sales: [],
    purchases: [],
    sellerSales: [],
    vehicleSales: [],
    currentSale: null,
    transactions: {
        asSeller: [],
        asBuyer: []
    },
    stats: {
        global: null,
        user: null
    },
    loadingStates: {
        creating: false,
        updating: false,
        fetchingSale: false,
        fetchingStats: false,
        fetchingUserStats: false,
        fetchingTransactions: false,
        fetchingPurchases: false,
        fetchingSellerSales: false,
        fetchingVehicleSales: false,
    },
    error: null,
    success: false,
};

export const useSaleStore = create<SaleStoreState & SaleStoreActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            
            // ✅ CREATE SALE
            createSale: async (data: SaleData) => {
                set({
                    loadingStates: { ...get().loadingStates, creating: true },
                    error: null,
                    success: false
                });
                
                try {
                    const sale = await saleService.createSale(data);
                    set(state => ({
                        sales: [...state.sales, sale],
                        success: true,
                        loadingStates: { ...state.loadingStates, creating: false }
                    }));
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, creating: false },
                        error: error instanceof Error ? error.message : 'Failed to create sale'
                    });
                }
            },
            
            // ✅ FETCH SALE BY ID
            fetchSaleById: async (id: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingSale: true },
                    error: null
                });
                
                try {
                    const sale = await saleService.getSaleById(id);
                    set({
                        currentSale: sale,
                        loadingStates: { ...get().loadingStates, fetchingSale: false }
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingSale: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch sale'
                    });
                }
            },
            
            // ✅ UPDATE SALE
            updateSale: async (id: string, data: UpdateSaleData) => {
                set({
                    loadingStates: { ...get().loadingStates, updating: true },
                    error: null,
                    success: false
                });
                
                try {
                    const updatedSale = await saleService.updateSale(id, data);
                    set(state => {
                        const updateInArray = (array: Sale[]) => 
                            array.map(sale => sale.id === id ? updatedSale : sale);
                            
                        return {
                            currentSale: state.currentSale?.id === id ? updatedSale : state.currentSale,
                            sales: updateInArray(state.sales),
                            purchases: updateInArray(state.purchases),
                            sellerSales: updateInArray(state.sellerSales),
                            vehicleSales: updateInArray(state.vehicleSales),
                            success: true,
                            loadingStates: { ...state.loadingStates, updating: false }
                        };
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, updating: false },
                        error: error instanceof Error ? error.message : 'Failed to update sale'
                    });
                }
            },
            
            // ✅ FETCH USER TRANSACTIONS
            fetchUserTransactions: async (userId: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingTransactions: true },
                    error: null
                });
                
                try {
                    const transactions = await saleService.getUserTransactions(userId);
                    set({
                        transactions,
                        loadingStates: { ...get().loadingStates, fetchingTransactions: false }
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingTransactions: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch transactions'
                    });
                }
            },
            
            // ✅ FETCH PURCHASES BY USER
            fetchPurchasesByUser: async (userId: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingPurchases: true },
                    error: null
                });
                
                try {
                    const purchases = await saleService.getPurchasesByUser(userId);
                    set({
                        purchases,
                        loadingStates: { ...get().loadingStates, fetchingPurchases: false }
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingPurchases: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch purchases'
                    });
                }
            },
            
            // ✅ FETCH SALES BY SELLER
            fetchSalesBySeller: async (userId: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingSellerSales: true },
                    error: null
                });
                
                try {
                    const sales = await saleService.getSalesBySeller(userId);
                    set({
                        sellerSales: sales,
                        loadingStates: { ...get().loadingStates, fetchingSellerSales: false }
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingSellerSales: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch seller sales'
                    });
                }
            },
            
            // ✅ FETCH SALES BY VEHICLE
            fetchSalesByVehicle: async (vehicleId: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingVehicleSales: true },
                    error: null
                });
                
                try {
                    const sales = await saleService.getSalesByVehicle(vehicleId);
                    set({
                        vehicleSales: sales,
                        loadingStates: { ...get().loadingStates, fetchingVehicleSales: false }
                    });
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingVehicleSales: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch vehicle sales'
                    });
                }
            },
            
            // ✅ FETCH GLOBAL SALES STATS
            fetchGlobalSalesStats: async () => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingStats: true },
                    error: null
                });
                
                try {
                    const stats = await saleService.getSalesStats();
                    set(state => ({
                        stats: { ...state.stats, global: stats },
                        loadingStates: { ...state.loadingStates, fetchingStats: false }
                    }));
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingStats: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch global stats'
                    });
                }
            },
            
            // ✅ FETCH USER SALES STATS
            fetchUserSalesStats: async (userId: string) => {
                set({
                    loadingStates: { ...get().loadingStates, fetchingUserStats: true },
                    error: null
                });
                
                try {
                    const stats = await saleService.getUserSalesStats(userId);
                    set(state => ({
                        stats: { ...state.stats, user: stats },
                        loadingStates: { ...state.loadingStates, fetchingUserStats: false }
                    }));
                } catch (error) {
                    set({
                        loadingStates: { ...get().loadingStates, fetchingUserStats: false },
                        error: error instanceof Error ? error.message : 'Failed to fetch user stats'
                    });
                }
            },
            
            // ✅ RESET STATE
            resetSaleState: () => set(initialState),
            
            // ✅ SET CURRENT SALE
            setCurrentSale: (sale: Sale | null) => set({ currentSale: sale }),
            
            // ✅ CLEAR STATS
            clearStats: () => set(state => ({
                stats: { global: null, user: null }
            })),
            
            // ✅ CLEAR ERROR
            clearError: () => set({ error: null }),
            
            // ✅ CLEAR SUCCESS
            clearSuccess: () => set({ success: false })
        }),
        {
            name: 'sale-store', // Nome para a persistência
            partialize: (state) => ({
                // Defina quais partes do estado devem ser persistidas
                // Evite persistir estados temporários como loading e error
                sales: state.sales,
                purchases: state.purchases,
                sellerSales: state.sellerSales,
                vehicleSales: state.vehicleSales,
                currentSale: state.currentSale,
                stats: state.stats,
                transactions: state.transactions
            }),
            // Opcional: use um storage diferente (padrão é localStorage)
            // storage: createJSONStorage(() => sessionStorage),
        }
    )
);