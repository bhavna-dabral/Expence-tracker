import axios from 'axios';

// This dynamically switches between your local computer and the live server
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

// Helper to attach your JWT token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
