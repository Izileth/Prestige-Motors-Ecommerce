import api from './api';
import type { User } from '../types/user';
import type { LoginData, RegisterData } from '../types/auth';
import type { ForgotPasswordData, ResetPasswordData } from '../types/password';
import type { AuthResponse } from '../types/response';

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post('/users/register', data);
        return response.data;
    },

    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post('/users/login', data, {
            withCredentials: true,
        });

        if (!response?.data) {
            throw new Error("Dados do usuário não retornados pela API");
        }
        console.log("Dados do usuário:", response.data);
        return response.data;
    },

    async logout(): Promise<void> {
        await api.post('/users/logout', {}, { 
            withCredentials: true 
        });
    },

    // Esta função verifica se há uma sessão ativa via cookie
    async checkSession(): Promise<User | null> {
        try {
            const response = await api.get('/users/check-session', {
                withCredentials: true
            });
            return response.data?.user || response.data;
        } catch (error) {
            console.error("Erro ao verificar sessão:", error);
            return null;
        }
    },

    // Esta função verifica o usuário atual via token (Authorization header)
    async getCurrentUser(): Promise<User> {
        try {
            const response = await api.get('/users/me');
            return response.data?.user || response.data;
        } catch (error) {
            console.error("Erro ao obter usuário atual:", error);
            throw error;
        }
    },

    async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
        const response = await api.post('/users/forgot-password', data);
        return response.data;
    },

    async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
        const response = await api.post('/users/reset-password', data);
        return response.data;
    }
};