import api from './api';
import type { SaleData, SaleStats, UpdateSaleData, UserSaleStats } from '../types/sale';
import type { UserTransactionsResponse } from '../types/transactions';

export const saleService = {
    async createSale(data: SaleData) {
        const response = await api.post('/sales', data);
        console.log( "Compra Criada!", response.data);
        return response.data;
    },

    async getSaleById(id: string) {
        const response = await api.get(`/sales/${id}`);
        console.log("Compra Encontrada!", response.data);
        return response.data;
    },

    async updateSale(id: string, data: UpdateSaleData) {
        const response = await api.put(`/sales/${id}`, data);
        console.log("Compra Atualizada!", response.data);
        return response.data;
    },

    // Transações como Comprador ou Vendedor

    async getUserTransactions(userId: string): Promise<UserTransactionsResponse> {
        const response = await api.get(`/sales/transactions/${userId}`);
        console.log("Transações do usuário encontradas!", response.data);
        return response.data;
    },
    
    // Histórico de compras do usuário (como comprador)
    async getPurchasesByUser(userId: string) {
        const response = await api.get(`/sales/buyers/${userId}`);
        console.log("Compras Encontradas!", response.data);
        return response.data;
    },

    // Histórico de vendas do usuário (como vendedor)
    async getSalesBySeller(userId: string) {
        const response = await api.get(`/sales/sellers/${userId}`);
        console.log("Vendas Encontradas!", response.data);
        return response.data;
    },

    async getSalesByVehicle(vehicleId: string) {
        const response = await api.get(`/sales/vehicles/${vehicleId}`);
        console.log("Vendas Encontradas!", response.data);
        return response.data;
    },

    async getUserSalesStats(userId: string): Promise<UserSaleStats> {
        const response = await api.get(`/sales/${userId}/stats`);
        
        console.log("Estatisticas de Vendas do Usuário Encontradas!", response.data);
        return response.data;
    },

    async getSalesStats(): Promise<SaleStats> {
        const response = await api.get('/sales/stats');
        console.log("Estatisticas de Vendas Encontradas!", response.data);
        return response.data;
    }
};