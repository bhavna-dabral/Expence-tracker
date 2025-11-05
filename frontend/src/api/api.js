import axios from "axios";

// ✅ Determine backend URL safely
const backendURL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://expence-tracker2.onrender.com"
    : "http://localhost:5000");

console.log("🔍 Using backend URL:", backendURL);

const API = axios.create({
  baseURL: `${backendURL}/api/v1`, // ✅ include /api/v1
  withCredentials: true,
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Handle 401 globally
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
