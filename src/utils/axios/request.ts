import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 50000,
    // 当发送跨域请求时携带 cookie
    withCredentials: true,
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        // 请求头带上 token
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.common['Access-Token'] = `${token}`
        }
        return config;
    },
    (error: AxiosError) => {
        console.warn(`Requesting: ${error.name}: ${error.message}`);
    }
);

// 请求 Content 类型
enum ContentType {
    JSON = 'application/json;charset=UTF-8',
    FORM_UNLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export default {
    async post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return (await instance({
            method: "POST",
            headers: { 'Content-Type': ContentType.JSON },
            ...config,
        })).data
    },
    async get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return (await instance({
            method: "GET",
            ...config
        })).data
    },
}