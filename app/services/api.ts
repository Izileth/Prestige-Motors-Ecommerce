import axios from 'axios';
import { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'https://prestige-motors-api.onrender.com/api';

// Flag para controlar tentativas de refresh token
let isRefreshing = false;
// Armazenar requisições pendentes para tentar novamente após refresh
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
}> = [];

// Função para processar a fila de requisições pendentes
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(request => {
    if (error) {
      request.reject(error);
    } else {
      // Adiciona o novo token à requisição
      if (token) {
        request.config.headers.Authorization = `Bearer ${token}`;
      }
      request.resolve();
    }
  });
  
  // Limpa a fila após processamento
  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Importante para cookies HTTP-only
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Interceptor de requisição para adicionar token
api.interceptors.request.use(
  (config) => {
    // Obter token do localStorage ou estado global
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para tratar erros de autenticação
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Verifica se é erro de não autorizado
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    
    // Evita redirecionamento em loop em páginas públicas
    const isPublicPage = window.location.pathname === '/login' || 
                       window.location.pathname === '/register';
    if (isPublicPage) {
      return Promise.reject(error);
    }

    // Obtém a configuração original da requisição para repetir depois
    const originalRequest = error.config as InternalAxiosRequestConfig;
    
    // Evita múltiplas tentativas de refresh para a mesma requisição
    if (originalRequest && originalRequest._retry) {
      // Se já tentamos refresh nesta requisição, redirecionamos para login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
    
    // Marca esta requisição como já processada
    if (originalRequest) {
      originalRequest._retry = true;
    }
    
    // Se já estamos atualizando o token, coloca a requisição na fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }
    
    isRefreshing = true;
    
    try {
      // Tentativa de renovar o token
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      
      // Se conseguimos um novo token
      if (response.data.token) {
        // Salva o novo token
        localStorage.setItem('token', response.data.token);
        
        // Atualiza o cabeçalho de autorização na requisição original
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        }
        
        // Processa a fila de requisições pendentes
        processQueue(null, response.data.token);
        
        // Repete a requisição original com o novo token
        return api(originalRequest);
      }
    } catch (refreshError) {
      // Falha ao renovar o token
      processQueue(new Error('Falha ao renovar token'));
      
      // Limpa dados de autenticação
      localStorage.removeItem('token');
      
      // Redireciona apenas uma vez para o login
      if (typeof window !== 'undefined') {
        // Evita redirecionamento em loop checando se já estamos na página de login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } finally {
      isRefreshing = false;
    }
    
    return Promise.reject(error);
  }
);

export default api;