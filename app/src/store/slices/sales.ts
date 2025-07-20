import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { saleService } from '~/src/services/sale';
import type { Sale, SaleData, SaleStats, UpdateSaleData, UserSaleStats } from '~/src/types/sale';
import type { UserTransactionsResponse } from '~/src/types/transactions';

export interface SaleState {
    sales: Sale[];
    purchases: Sale[];
    sellerSales: Sale[];
    vehicleSales: Sale[];
    currentSale: Sale | null;
    stats: {
        global: SaleStats | null;
        user: UserSaleStats | null;
    };
    // ✅ Loading states específicos em vez de um global
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

const initialState: SaleState = {
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

// Thunks assíncronos (mantidos iguais)
export const createSale = createAsyncThunk(
    'sales/create',
    async (data: SaleData, { rejectWithValue }) => {
        try {
            return await saleService.createSale(data);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create sale');
        }
    }
);

export const fetchSaleById = createAsyncThunk(
    'sales/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            return await saleService.getSaleById(id);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch sale');
        }
    }
);

export const updateSale = createAsyncThunk(
    'sales/update',
    async ({ id, data }: { id: string; data: UpdateSaleData }, { rejectWithValue }) => {
        try {
            return await saleService.updateSale(id, data);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update sale');
        }
    }
);

export const fetchUserTransactions = createAsyncThunk(
    'sales/fetchTransactions',
    async (userId: string, { rejectWithValue }) => {
        try {
            return await saleService.getUserTransactions(userId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch transactions');
        }
    }
);

export const fetchPurchasesByUser = createAsyncThunk(
    'sales/fetchPurchases',
    async (userId: string, { rejectWithValue }) => {
        try {
            return await saleService.getPurchasesByUser(userId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch purchases');
        }
    }
);

export const fetchSalesBySeller = createAsyncThunk(
    'sales/fetchSellerSales',
    async (userId: string, { rejectWithValue }) => {
        try {
            return await saleService.getSalesBySeller(userId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch seller sales');
        }
    }
);

export const fetchSalesByVehicle = createAsyncThunk(
    'sales/fetchByVehicle',
    async (vehicleId: string, { rejectWithValue }) => {
        try {
            return await saleService.getSalesByVehicle(vehicleId);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch vehicle sales');
        }
    }
);

export const fetchGlobalSalesStats = createAsyncThunk(
    'sales/fetchGlobalStats',
    async (_, { rejectWithValue }) => {
        try {
            return await saleService.getSalesStats();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch global stats');
        }
    }
);

export const fetchUserSalesStats = createAsyncThunk(
    'sales/fetchUserStats',
    async (userId: string, { rejectWithValue }) => {
        try {
            return await saleService.getUserSalesStats(userId); 
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user stats');
        }
    }
);

const saleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
        resetSaleState: () => initialState,
        setCurrentSale: (state, action: PayloadAction<Sale | null>) => {
            state.currentSale = action.payload;
        },
        clearStats: (state) => {
            state.stats = { global: null, user: null };
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // ✅ CREATE SALE
            .addCase(createSale.pending, (state) => {
                state.loadingStates.creating = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.sales.push(action.payload);
                state.success = true;
                state.loadingStates.creating = false;
            })
            .addCase(createSale.rejected, (state, action) => {
                state.loadingStates.creating = false;
                state.error = action.payload as string;
            })

            // ✅ FETCH SALE BY ID
            .addCase(fetchSaleById.pending, (state) => {
                state.loadingStates.fetchingSale = true;
                state.error = null;
            })
            .addCase(fetchSaleById.fulfilled, (state, action) => {
                state.currentSale = action.payload;
                state.loadingStates.fetchingSale = false;
            })
            .addCase(fetchSaleById.rejected, (state, action) => {
                state.loadingStates.fetchingSale = false;
                state.error = action.payload as string;
            })

            // ✅ UPDATE SALE - MAIS ESPECÍFICO
            .addCase(updateSale.pending, (state) => {
                state.loadingStates.updating = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                // Atualizar currentSale se for o mesmo ID
                if (state.currentSale?.id === action.payload.id) {
                    state.currentSale = action.payload;
                }
                
                // Atualizar em todas as listas onde possa existir
                state.sales = state.sales.map(sale => 
                    sale.id === action.payload.id ? action.payload : sale
                );
                
                state.purchases = state.purchases.map(sale => 
                    sale.id === action.payload.id ? action.payload : sale
                );
                
                state.sellerSales = state.sellerSales.map(sale => 
                    sale.id === action.payload.id ? action.payload : sale
                );
                
                state.vehicleSales = state.vehicleSales.map(sale => 
                    sale.id === action.payload.id ? action.payload : sale
                );

                state.success = true;
                state.loadingStates.updating = false;
            })
            .addCase(updateSale.rejected, (state, action) => {
                state.loadingStates.updating = false;
                state.error = action.payload as string;
            })

            // ✅ PURCHASES
            .addCase(fetchPurchasesByUser.pending, (state) => {
                state.loadingStates.fetchingPurchases = true;
                state.error = null;
            })
            .addCase(fetchPurchasesByUser.fulfilled, (state, action) => {
                state.purchases = action.payload;
                state.loadingStates.fetchingPurchases = false;
            })
            .addCase(fetchPurchasesByUser.rejected, (state, action) => {
                state.loadingStates.fetchingPurchases = false;
                state.error = action.payload as string;
            })

            // ✅ TRANSACTIONS
            .addCase(fetchUserTransactions.pending, (state) => {
                state.loadingStates.fetchingTransactions = true;
                state.error = null;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loadingStates.fetchingTransactions = false;
            })
            .addCase(fetchUserTransactions.rejected, (state, action) => {
                state.loadingStates.fetchingTransactions = false;
                state.error = action.payload as string;
            })

            // ✅ SELLER SALES
            .addCase(fetchSalesBySeller.pending, (state) => {
                state.loadingStates.fetchingSellerSales = true;
                state.error = null;
            })
            .addCase(fetchSalesBySeller.fulfilled, (state, action) => {
                state.sellerSales = action.payload;
                state.loadingStates.fetchingSellerSales = false;
            })
            .addCase(fetchSalesBySeller.rejected, (state, action) => {
                state.loadingStates.fetchingSellerSales = false;
                state.error = action.payload as string;
            })

            // ✅ VEHICLE SALES
            .addCase(fetchSalesByVehicle.pending, (state) => {
                state.loadingStates.fetchingVehicleSales = true;
                state.error = null;
            })
            .addCase(fetchSalesByVehicle.fulfilled, (state, action) => {
                state.vehicleSales = action.payload;
                state.loadingStates.fetchingVehicleSales = false;
            })
            .addCase(fetchSalesByVehicle.rejected, (state, action) => {
                state.loadingStates.fetchingVehicleSales = false;
                state.error = action.payload as string;
            })

            // ✅ GLOBAL STATS
            .addCase(fetchGlobalSalesStats.pending, (state) => {
                state.loadingStates.fetchingStats = true;
                state.error = null;
            })
            .addCase(fetchGlobalSalesStats.fulfilled, (state, action) => {
                state.stats.global = action.payload;
                state.loadingStates.fetchingStats = false;
            })
            .addCase(fetchGlobalSalesStats.rejected, (state, action) => {
                state.loadingStates.fetchingStats = false;
                state.error = action.payload as string;
            })

            // ✅ USER STATS
            .addCase(fetchUserSalesStats.pending, (state) => {
                state.loadingStates.fetchingUserStats = true;
                state.error = null;
            })
            .addCase(fetchUserSalesStats.fulfilled, (state, action) => {
                state.stats.user = action.payload;
                state.loadingStates.fetchingUserStats = false;
            })
            .addCase(fetchUserSalesStats.rejected, (state, action) => {
                state.loadingStates.fetchingUserStats = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetSaleState, setCurrentSale, clearStats, clearError, clearSuccess } = saleSlice.actions;
export default saleSlice.reducer;