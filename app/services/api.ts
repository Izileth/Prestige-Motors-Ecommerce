import axios from 'axios';





// Cache para evitar múltiplos redirecionamentos
let isRedirecting = false;

// Tempo mínimo entre redirecionamentos (em milissegundos)
const REDIRECT_COOLDOWN = 5000;
let lastRedirectTime = 0;

const isDev = process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: isDev 
    ? 'http://localhost:4242/api' 
    : 'https://prestige-motors-api.onrender.com/api',
  withCredentials: true,
  timeout: 100000,
    headers: { 
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
  },
  
  // Adicione esta configuração para prevenir transformação automática
  transformRequest: [
    function (data, headers) {
      // Se for FormData, não transforme e deixe o axios lidar com os headers
      if (data instanceof FormData) {
        return data;
      }
      
      // Para outros tipos de dados, transforme em JSON
      if (typeof data === 'object') {
        headers['Content-Type'] = 'application/json';
        return JSON.stringify(data);
      }
      
      return data;
    }
  ]
});
  
// Interceptor para adicionar o token de autorização, se disponível
// Interceptor para adicionar Headers comuns

api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  }
  
  if (typeof config.data === 'object' && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
    config.data = JSON.stringify(config.data);
  }
  
  return config;
});

// Interceptor de resposta para tratamento de erros
// Interceptor de resposta para tratamento de erros

api.interceptors.response.use(
  response => response,
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

    // Tratamento para erro 401 (Não Autorizado)
    if (error.response?.status === 401) {
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