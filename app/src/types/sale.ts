export type SaleStatus = 'PENDENTE' | 'CONCLUIDA' | 'CANCELADA' | 'EM_NEGOCIACAO' | 'FATURADA';
export interface Sale {
    id: string;
    vehicleId: string;
    compradorId: string;
    vendedorId: string;
    precoVenda: number;
    formaPagamento: string;
    parcelas?: number;
    observacoes?: string;
    dataVenda: string;
    status: 'PENDENTE' | 'CONCLUIDA' | 'CANCELADA';
    vehicle?: {
        marca: string;
        modelo: string;
        anoFabricacao: number;
        imagemPrincipal?: string | null;
    };
    comprador?: {
        nome: string;
        email: string;
        avatar?: string;
    };
    vendedor?: {
        nome: string;
        email: string;
    };
}
export interface SaleData {
    vehicleId: string;
    compradorId: string;
    precoVenda: number;
    formaPagamento: string;
    parcelas?: number;
    observacoes?: string;
    categoria: string;
}

export interface UpdateSaleData {
    precoVenda?: number;
    status?: string;
    formaPagamento?: string;
    observacoes?: string;
}

export interface SaleStats {
    totalSales: number;
    totalRevenue: number;
    averageSalePrice: number;
    byPaymentMethod: Record<string, { 
        count: number;
        total: number;
    }>;
    byStatus: Record<string, {
        count: number;
        total: number;
    }>;
    monthlySales: Array<{
        month: string;
        count: number;
        total: number;
        average?: number;
    }>;
    byVehicleCategory: Record<
    string, { count: number; total: number 
    }>;
    topVehicles: Array<{
        vehicleId: string;
        model: string;
        brand: string;
        salesCount: number;
        totalRevenue: number;
    }>;
    topSellers: Array<{
        seller: { nome: string; email: string };
        salesCount: number;
        totalRevenue: number;
    }>;
    salesTrend?: {
        labels: string[];
        data: number[];
    };
}

// User Sale Stats

export interface User {
    id: string;
    nome: string;
    email: string;
}

export interface SalesTotals {
    sales: number;
    revenue: number;
    averageSale: number;
    minSale: number;
    maxSale: number;
}

export interface PurchasesTotals {
    purchases: number;
    spent: number;
    averagePurchase: number;
    minPurchase: number;
    maxPurchase: number;
}

export interface PaymentMethodStats {
    count: number;
    total: number;
}

export interface PaymentMethodData {
    [paymentMethod: string]: PaymentMethodStats;
}

export interface StatusData {
    [status: string]: number;
}

export interface MonthlySales {
  month: string;
    count: number;
    total: number;
}

export interface VehicleCategoryStats {
    count: number;
    total: number;
}

export interface VehicleCategoryData {
    [category: string]: VehicleCategoryStats;
}

export interface Seller {
    nome?: string;
    email?: string;
}

export interface RecentSale {
    id: string;
    precoVenda: number;
    dataVenda: string;
    status: string;
    formaPagamento: string;
    categoriaVeiculo: string | null;
    vendedor?: Seller;
}

export interface Ranking {
    position: number;
    totalSellers: number;
}

export interface AsSellerData {
    totals: SalesTotals;
    byPaymentMethod: PaymentMethodData;
    byStatus: StatusData;
    monthlySales: MonthlySales[];
    byVehicleCategory: VehicleCategoryData;
    recentSales: RecentSale[];
    ranking: Ranking;
}

export interface AsBuyerData {
    totals: PurchasesTotals;
    byPaymentMethod: PaymentMethodData;
    byStatus: StatusData;
    monthlyPurchases: MonthlySales[];
    byVehicleCategory: VehicleCategoryData;
    recentPurchases: RecentSale[];
}

export interface UserSaleStats {
    user: User;
    asSeller: AsSellerData;
    asBuyer: AsBuyerData;
}

// Tipos auxiliares para componentes específicos
export interface ChartData {
    name: string;
    value: number;
    color?: string;
}

export interface MonthlyChartData {
  month: string;
    sales: number;
    purchases: number;
    revenue: number;
    spent: number;
}