import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = 
      localStorage.getItem("auth_token") || 
      localStorage.getItem("authToken") || 
      localStorage.getItem("auth_bearer_token") ||
      sessionStorage.getItem("auth_token") || 
      sessionStorage.getItem("authToken") || 
      sessionStorage.getItem("auth_bearer_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
