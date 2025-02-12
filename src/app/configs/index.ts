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
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);