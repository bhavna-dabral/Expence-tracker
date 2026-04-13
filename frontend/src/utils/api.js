import axios from 'axios';

// This looks for the variable in Render/Vercel settings
// If it's not found (like on your local PC), it defaults to localhost
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Automatically attach the token to every request if it exists
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
