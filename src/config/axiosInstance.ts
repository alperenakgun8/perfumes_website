import axios from "axios";

export const BASE_URL = "https://perfumes-backend-blro.onrender.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

console.log(BASE_URL);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;