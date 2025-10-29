// src/api.js
import axios from "axios";

// Automatically choose backend URL based on environment
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api", // ✅ no hardcoded localhost
  withCredentials: true, // ✅ important if you use cookies or sessions
});

// ✅ Automatically attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Global error handling (optional but useful)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized – redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
