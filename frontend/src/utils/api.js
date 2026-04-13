import axios from 'axios';

// This looks for an environment variable called REACT_APP_API_URL.
// If it's not there (like when you're working locally), it uses localhost.
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
