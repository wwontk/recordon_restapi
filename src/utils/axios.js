import axios from "axios";
import { getCookie } from "./cookie";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_PUBLIC_SERVER}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("access-token");
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default axiosInstance;
