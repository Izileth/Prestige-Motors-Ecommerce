
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '~/services/auth';
import type { User } from '~/types/user';
import type { LoginData, RegisterData } from '~/types/auth';

interface ResetPasswordState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  resetPasswordState: ResetPasswordState; // Renomeado para evitar conflito
  
  // Actions
    
  registerUser: (userData: RegisterData) => Promise<void>;
  loginUser: (credentials: LoginData) => Promise<void>;
  logoutUser: () => Promise<void>;
  checkSession: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: { token: string; senha: string }) => Promise<void>; // Mantido como ação
  logout: () => void;
  clearResetPasswordStatus: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial (equivalente ao seu initialState)
      user: null,
      status: 'idle',
      error: null,
      resetPasswordState: { // Atualizado para o novo nome
        status: 'idle',
        error: null,
      },


      // Ações (equivalentes às suas thunks e reducers)
      registerUser: async (userData) => {
        set({ status: 'loading', error: null });
        try {
          const response = await authService.register(userData);
          set({ status: 'succeeded', user: response.user });
        } catch (error) {
          console.log(error, 'Erro na Conexão');
          set({ status: 'failed', error: 'Erro ao registrar usuário' });
          throw error;
        }
      },

      loginUser: async ({ email, senha }) => {
        set({ status: 'loading', error: null });
        try {
          const response = await authService.login({ email, senha });
          if (response?.user) {
            console.log("Dados recebidos da API:", response.user);
            set({ status: 'succeeded', user: response.user });
          } else {
            throw new Error('Dados de usuário não encontrados na resposta');
          }
        } catch (error) {
          console.log(error, 'Erro no Login');
          set({ status: 'failed', error: 'Erro ao fazer login' });
          throw error;
        }
      },

      logoutUser: async () => {
        try {
          await authService.logout();
          get().logout();
        } catch (error) {
          console.error('Erro durante logout:', error);
          throw error;
        }
      },

      checkSession: async () => {
        set({ status: 'loading' });
        try {
          const user = await authService.getCurrentUser();
          set({ status: 'succeeded', user });
        } catch (error) {
          console.log(error, 'Token Expirado');
          set({ status: 'failed', user: null });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ 
          resetPasswordState: { 
            status: 'loading', 
            error: null 
          } 
        });
        try {
          await authService.forgotPassword({ email });
          set({ 
            resetPasswordState: { 
              status: 'succeeded', 
              error: null 
            } 
          });
        } catch (error) {
          console.log(error, 'Erro na Definição de Senha');
          set({ 
            resetPasswordState: { 
              status: 'failed', 
              error: 'Erro ao solicitar reset de senha' 
            } 
          });
          throw error;
        }
      },

      resetPassword: async ({ token, senha }) => {
        set({ 
          resetPasswordState: { 
            status: 'loading', 
            error: null 
          } 
        });
        try {
          await authService.resetPassword({ token, senha });
          set({ 
            resetPasswordState: { 
              status: 'succeeded', 
              error: null 
            } 
          });
        } catch (error) {
          console.log(error, 'Erro na Modificação');
          set({ 
            resetPasswordState: { 
              status: 'failed', 
              error: 'Erro ao resetar senha' 
            } 
          });
          throw error;
        }
      },

      // Reducers simples (equivalentes aos seus reducers)
      logout: () => set({ 
        user: null, 
        status: 'idle', 
        error: null 
      }),

      clearResetPasswordStatus: () => set({
        resetPasswordState: {
          status: 'idle',
          error: null
        }
      }),

      setUser: (user) => set({ 
        user, 
        status: 'succeeded' 
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user 
      }),
    }
  )
);

// Selectors (opcionais, podem ser usados diretamente do store)
export const selectCurrentUser = () => useAuthStore.getState().user;
export const selectAuthStatus = () => useAuthStore.getState().status;
export const selectResetPasswordStatus = () => useAuthStore.getState().resetPasswordState;
export const selectAuthError = () => useAuthStore.getState().error;