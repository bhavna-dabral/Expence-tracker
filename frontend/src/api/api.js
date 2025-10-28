import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // your backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.token = token;
  return req;
});

export default API;
