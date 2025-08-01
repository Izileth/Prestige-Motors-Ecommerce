import api from './api';
import type { UserUpdateData, UserStats } from '../types/user';
import type { AddressData } from '~/src/types/address';
import type { GetUsersParams, GetUsersResponse } from '../types/users';

export const userService = {
    baseUrl: '/users',

    async getUsers(params?: GetUsersParams): Promise<GetUsersResponse> {
        try {
        const searchParams = new URLSearchParams();
        
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());
        if (params?.search) searchParams.append('search', params.search);
        if (params?.role) searchParams.append('role', params.role);

        const url = `${this.baseUrl}/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        const response = await api.get<GetUsersResponse>(url);
        
        return response.data;
        } catch (error: any) {
        console.error('Erro no serviço de usuários:', error);
        
        // Tratar diferentes tipos de erro
        if (error.response?.status === 401) {
            throw new Error('Não autorizado para acessar usuários');
        }
        if (error.response?.status === 403) {
            throw new Error('Sem permissão para acessar usuários');
        }
        
        throw new Error('Falha ao buscar usuários');
        }
    },

    async getUserById(id: string) {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    
    // Atualização do método updateUser no userService
    async updateUser(id: string, data: UserUpdateData) {
        // Garantindo que dados estão no formato esperado pelo backend
        const sanitizedData: UserUpdateData = {};
        
        if (data.nome !== undefined) sanitizedData.nome = data.nome;
        if (data.email !== undefined) sanitizedData.email = data.email;
        if (data.role !== undefined) sanitizedData.role = data.role;
        if (data.avatar !== undefined) sanitizedData.avatar = data.avatar;
        if (data.telefone !== undefined) sanitizedData.telefone = data.telefone;
        if (data.cpf !== undefined) sanitizedData.cpf = data.cpf;
        if (data.dataNascimento !== undefined) sanitizedData.dataNascimento = data.dataNascimento;
        
        // Adiciona campos de senha se presentes
        if (data.senhaAtual !== undefined && data.senha !== undefined) {
            sanitizedData.senhaAtual = data.senhaAtual;
            sanitizedData.senha = data.senha;
        }

        console.log("userService - Dados sanitizados para envio:", {
            ...sanitizedData,
            senha: sanitizedData.senha ? '[REDACTED]' : undefined,
            senhaAtual: sanitizedData.senhaAtual ? '[REDACTED]' : undefined
        });
        
        try {
            const response = await api.put(`/users/${id}`, sanitizedData);
            console.log("userService - Resposta do servidor:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("userService - Erro ao atualizar usuário:", 
                error.response?.data || error.message);
            
            // Se for erro de senha incorreta, transformar em mensagem mais amigável
            if (error.response?.data?.message?.includes('senha atual')) {
                throw new Error('A senha atual está incorreta');
            }
            
            throw error;
        }
    },

    async deleteUser(id: string) {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },

    async getUserStats(id: string): Promise<UserStats> {
        const response = await api.get(`/users/${id}/stats`);
        return response.data;
    },
    
    // Address operations
    async getUserAddresses(userId: string) {
        const response = await api.get(`/users/${userId}/addresses`);
        return response.data;
    },

    async createAddress(userId: string, data: AddressData) {
        const response = await api.post(`/users/${userId}/addresses`, data);
        return response.data;
    },

    async updateAddress(addressId: string, data: AddressData) {
        const response = await api.put(`/users/addresses/${addressId}`, data);
        return response.data;
    },

    async deleteAddress(addressId: string) {
        const response = await api.delete(`/users/addresses/${addressId}`);
        return response.data;
    },

    async uploadAvatar(userId: string, file: File) {
        const formData = new FormData();
        formData.append('avatar', file);
        
        const response = await api.post(`/users/${userId}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};