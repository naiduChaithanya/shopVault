import axios from "axios";

const BASE_URL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {"Content-Type":"application/json"}
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("shopvault_token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){            
            localStorage.removeItem("shopvault_token");
            localStorage.removeItem("shopvault_user");
            window.location.href = "/login";
        }
        return Promise.reject(error)
    }
)

export default axiosInstance

