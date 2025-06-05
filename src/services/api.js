import axios from "axios";
import { redirectToLogin } from "./navigation";

const api = axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://circle-xxxn.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;
