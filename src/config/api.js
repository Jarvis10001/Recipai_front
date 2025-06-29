// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:2006/api',
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:2006',
    TIMEOUT: 10000, // 10 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        VERIFY_TOKEN: '/auth/verify-token',
        REFRESH_TOKEN: '/auth/refresh-token',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    
    // User endpoints
    USERS: {
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        DELETE_ACCOUNT: '/users/delete-account',
    },
    
    // Recipe endpoints
    RECIPES: {
        SUGGESTIONS: '/recipes/suggestions',
        DETAILED: '/recipes/detailed',
        ANALYZE: '/recipes/analyze',
        TIPS: '/recipes/tips',
        SAVE: '/recipes/save',
    },
    
    // Health check
    HEALTH: '/health',
};

// Helper function to build complete URL
export const buildApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Environment info
export const getEnvironmentInfo = () => {
    return {
        nodeEnv: import.meta.env.NODE_ENV,
        apiBaseUrl: API_CONFIG.BASE_URL,
        backendUrl: API_CONFIG.BACKEND_URL,
        isDevelopment: import.meta.env.DEV,
        isProduction: import.meta.env.PROD,
    };
};

console.log('API Configuration:', getEnvironmentInfo());
