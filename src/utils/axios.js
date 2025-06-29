import axios from 'axios';
import { API_CONFIG } from '../config/api.js';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for sessions/cookies
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log requests in development
        if (import.meta.env.DEV) {
            console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => {
        // Log responses in development
        if (import.meta.env.DEV) {
            console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }
        
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        
        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        
        // Handle network errors
        if (!error.response) {
            console.error('Network error - check if backend is running at:', API_CONFIG.BACKEND_URL);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
