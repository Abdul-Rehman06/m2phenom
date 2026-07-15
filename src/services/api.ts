import axios from 'axios';
import { ENV } from '@/config';

// Create a configured Axios instance
export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Inject auth token if available
    const token = localStorage.getItem('m2_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      localStorage.removeItem('m2_auth_token');
      // Dispatch custom event to let AuthContext know
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    
    return Promise.reject(error);
  }
);
