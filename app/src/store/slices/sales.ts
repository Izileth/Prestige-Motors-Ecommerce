
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
    loading: boolean;
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
        global: null, // Mudança: inicializar como null para melhor controle
        user: null
    },
    loading: false,
    error: null,
    success: false,
};

// Thunks assíncronos
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
            .addCase(createSale.fulfilled, (state, action) => {
                state.sales.push(action.payload);
                state.success = true;
                state.loading = false;
            })
            .addCase(fetchSaleById.fulfilled, (state, action) => {
                state.currentSale = action.payload;
                state.loading = false;
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                if (state.currentSale?.id === action.payload.id) {
                    state.currentSale = action.payload;
                }
                state.sales = state.sales.map(sale => 
                    sale.id === action.payload.id ? action.payload : sale
                );
                state.success = true;
                state.loading = false;
            })
            .addCase(fetchPurchasesByUser.fulfilled, (state, action) => {
                state.purchases = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
            })
            .addCase(fetchSalesBySeller.fulfilled, (state, action) => {
                state.sellerSales = action.payload;
                state.loading = false;
            })
            .addCase(fetchSalesByVehicle.fulfilled, (state, action) => {
                state.vehicleSales = action.payload;
                state.loading = false;
            })
            .addCase(fetchGlobalSalesStats.fulfilled, (state, action) => {
                state.stats.global = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserSalesStats.fulfilled, (state, action) => {
                state.stats.user = action.payload;
                state.loading = false;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )
            .addMatcher(
              (action: PayloadAction<string, string, { rejectedWithValue: true }>) => action.type.endsWith('/rejected'),
              (state, action: PayloadAction<string, string, { rejectedWithValue: true }>) => {
                  state.loading = false;
                  state.error = action.payload;
              }
            );
    },
});

export const { resetSaleState, setCurrentSale, clearStats, clearError, clearSuccess } = saleSlice.actions;
export default saleSlice.reducer;