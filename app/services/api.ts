import axios from 'axios';
import { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Extendendo a interface do Axios
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const API_URL = 'http://localhost:4242/api';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(request => {
    if (error) {
      request.reject(error);
    } else {
      if (token) {
        request.config.headers.Authorization = `Bearer ${token}`;
      }
      request.resolve();
    }
  });
  
  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    
    const isPublicPage = window.location.pathname === '/login' || 
                       window.location.pathname === '/register';
    if (isPublicPage) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig;
    
    if (originalRequest && originalRequest._retry) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
    
    if (originalRequest) {
      originalRequest._retry = true;
    }
    
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }
    
    isRefreshing = true;
    
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        }
        
        processQueue(null, response.data.token);
        return api(originalRequest);
      }
    } catch (refreshError) {
      processQueue(new Error('Falha ao renovar token'));
      localStorage.removeItem('token');
      
      if (typeof window !== 'undefined') {
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