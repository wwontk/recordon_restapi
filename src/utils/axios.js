import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookie";

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
    Promise.reject(error);
  }
);

// *** accessToken 만료시 refreshToken으로 재발금 *** //
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const req = error.config;
    const refreshToken = getCookie("refresh-token");

    if (error.response.status === 401) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_PUBLIC_SERVER}/company/refreshToken`,
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = res.data.accessToken;
        setCookie("access-token", newAccessToken, { path: "/" });

        req.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance(req);
      } catch (error) {
        console.log(error);
        alert("로그인을 다시 진행해주세요.");
        removeCookie("access-token");
        removeCookie("refresh-token");
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
