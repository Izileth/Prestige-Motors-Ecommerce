import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '~/src/services/auth';
import type { User } from '~/src/types/user';
import type { LoginData, RegisterData } from '~/src/types/auth';

interface ResetPasswordState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  resetPasswordState: ResetPasswordState;
  isInitialized: boolean; // Novo campo para controlar inicialização
  
  // Actions
  registerUser: (userData: RegisterData) => Promise<void>;
  loginUser: (credentials: LoginData) => Promise<void>;
  logoutUser: () => Promise<void>;
  checkSession: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: { token: string; senha: string }) => Promise<void>;
  logout: () => void;
  clearResetPasswordStatus: () => void;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>; // Nova função para inicializar
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      status: 'idle',
      error: null,
      isInitialized: false,
      resetPasswordState: {
        status: 'idle',
        error: null,
      },

      // Nova função para inicializar o estado
      initialize: async () => {
        if (get().isInitialized) return;
        
        set({ status: 'loading' });
        
        try {
          // Primeiro, verificar se há um token no localStorage
          const token = localStorage.getItem('token');
          
          if (token) {
            // Se há token, verificar se ainda é válido
            const user = await authService.getCurrentUser();
            set({ 
              user, 
              status: 'succeeded', 
              error: null,
              isInitialized: true 
            });
          } else {
            // Se não há token, tentar verificar sessão via cookie
            const user = await authService.checkSession();
            if (user) {
              set({ 
                user, 
                status: 'succeeded', 
                error: null,
                isInitialized: true 
              });
            } else {
              set({ 
                user: null, 
                status: 'idle', 
                error: null,
                isInitialized: true 
              });
            }
          }
        } catch (error) {
          console.log('Erro na inicialização:', error);
          // Limpar qualquer token inválido
          localStorage.removeItem('token');
          set({ 
            user: null, 
            status: 'idle', 
            error: null,
            isInitialized: true 
          });
        }
      },

      registerUser: async (userData) => {
        set({ status: 'loading', error: null });
        try {
          const response = await authService.register(userData);
          if (response?.user && response?.token) {
            localStorage.setItem('token', response.token);
            set({ 
              status: 'succeeded', 
              user: response.user,
              error: null
            });
          } else {
            throw new Error('Dados de usuário não encontrados na resposta');
          }
        } catch (error) {
          const isAxiosError = (err: unknown): err is AxiosErrorResponse => {
            return typeof err === 'object' && err !== null && 'response' in err;
          };

          let errorMessage = 'Erro ao registrar usuário';
          
          if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          console.error('Register error:', error);
          set({ 
            status: 'failed', 
            error: errorMessage
          });
          throw error;
        }
      },

      loginUser: async ({ email, senha }) => {
        set({ status: 'loading', error: null });
        try {
          const response = await authService.login({ email, senha });
          if (response?.user) {
            console.log("Dados recebidos da API:", response.user);
            
            // Se a resposta incluir um token, salvá-lo
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
            
            set({ status: 'succeeded', user: response.user, error: null });
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
          localStorage.removeItem('token');
          set({ 
            user: null, 
            status: 'idle', 
            error: null 
          });
        } catch (error) {
          console.error('Erro durante logout:', error);
          // Mesmo com erro, limpar o estado local
          localStorage.removeItem('token');
          set({ 
            user: null, 
            status: 'idle', 
            error: null 
          });
          throw error;
        }
      },

      checkSession: async () => {
        set({ status: 'loading' });
        try {
          const user = await authService.getCurrentUser();
          set({ status: 'succeeded', user });
        } catch (error) {
          console.log(error, 'Erro na verificação de sessão');
          localStorage.removeItem('token');
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
          console.log(error, 'Erro na solicitação de reset de senha');
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
          console.log(error, 'Erro no reset de senha');
          set({ 
            resetPasswordState: { 
              status: 'failed', 
              error: 'Erro ao resetar senha' 
            } 
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ 
          user: null, 
          status: 'idle', 
          error: null 
        });
      },

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
        user: state.user,
        // Não persistir isInitialized para forçar nova inicialização
      }),
    }
  )
);

// Selectors
export const selectCurrentUser = () => useAuthStore.getState().user;
export const selectAuthStatus = () => useAuthStore.getState().status;
export const selectResetPasswordStatus = () => useAuthStore.getState().resetPasswordState;
export const selectAuthError = () => useAuthStore.getState().error;
export const selectIsInitialized = () => useAuthStore.getState().isInitialized;