import axios from "axios";
import { BASE_URL_SERVER } from "../constants";

export const customAxios = axios.create({
    baseURL: BASE_URL_SERVER,
    timeout: 10000
})

customAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
async function refreshAccessToken() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const deviceId = localStorage.getItem("deviceId");

        if (!refreshToken || !deviceId) {
            throw new Error("Refresh token yoki Device ID yo‘q!");
        }

        const response = await axios.post(`${BASE_URL_SERVER}api/auth/refresh-token`, {
            refreshToken,
            deviceId,
        });

        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken); 
            return newAccessToken;
        } else {
            throw new Error("Yangi token olinmadi!");
        }
    } catch (error) {
        console.error("Token yangilashda xatolik:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("deviceId");
        window.location.href = "/sigin"; 
        return null;
    }
}


customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 406 && !originalRequest._retry) {
            originalRequest._retry = true; 

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                return customAxios(originalRequest); 
            }
        }

        return Promise.reject(error);
    }
);