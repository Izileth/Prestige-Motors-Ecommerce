import axios from 'axios';

// Cache para evitar múltiplos redirecionamentos
let isRedirecting = false;
// Tempo mínimo entre redirecionamentos (em milissegundos)
const REDIRECT_COOLDOWN = 5000;
let lastRedirectTime = 0;

const isDev = process.env.NODE_ENV === 'development';
const API_BASE_URL = isDev 
  ? 'http://localhost:4242/api' 
  : 'https://prestige-motors-api.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Importante para que os cookies sejam enviados
  timeout: 100000,
  headers: { 
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  }
});

// Interceptor para adicionar o token de autorização, se disponível
api.interceptors.request.use(config => {
  // Para FormData, evitar transformação
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  }
  
  // Para outros tipos de dados
  if (typeof config.data === 'object' && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  
  // Tentar obter o token do localStorage como fallback
  const token = localStorage.getItem('token');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor de resposta para tratamento de erros
api.interceptors.response.use(
  response => {
    // Se a resposta incluir um token, salvá-lo no localStorage como fallback
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  error => {
    const currentTime = Date.now();
    
    // Tratamento específico para timeout
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: Servidor não respondeu a tempo');
      return Promise.reject({ 
        customError: 'SERVER_TIMEOUT',
        message: 'O servidor demorou muito para responder' 
      });
    }
    if (error.config.url.includes('/logout')) {
      return Promise.reject(error);
    }
    // Tratamento para erro 401 (Não Autorizado)
    if (error.response?.status === 401) {
      // Limpar token do localStorage em caso de erro de autenticação
      localStorage.removeItem('token');
      
      if (shouldRedirectToLogin()) { // Função auxiliar
        handleUnauthorizedRedirect();
      }
      return Promise.reject({
        customError: 'UNAUTHORIZED',
        message: 'Sessão expirada ou não autorizada'
      });
    }

    // Tratamento para erro 403 (Proibido)
    if (error.response?.status === 403) {
      return Promise.reject({
        customError: 'FORBIDDEN',
        message: 'Você não tem permissão para esta ação'
      });
    }

    // Padrão para outros erros
    return Promise.reject({
      customError: 'SERVER_ERROR',
      message: error.response?.data?.message || 'Erro desconhecido no servidor'
    });
  }
);

// Funções auxiliares
function shouldRedirectToLogin() {
  return (
    !window.location.pathname.includes('/login') &&
    !isRedirecting &&
    (Date.now() - lastRedirectTime > REDIRECT_COOLDOWN)
  );
}

function handleUnauthorizedRedirect() {
  isRedirecting = true;
  lastRedirectTime = Date.now();
  
  setTimeout(() => {
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    setTimeout(() => isRedirecting = false, 1000);
  }, 100);
}

export default api;