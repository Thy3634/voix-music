import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import _ from "lodash";
import router from '~/router';

/**
 * 配置新建一个 axios 实例
 */
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
    (config: AxiosRequestConfig) => {
        // requestCancelers.remove(config)
        // requestCancelers.add(config)
        // 请求头带上 token
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.common['Access-Token'] = `${token}`
        }
        return config;
    },
    (error: AxiosError) => {
        console.error(`网络请求异常${error.message}`)
    }
);

/**
 * 自定义响应数据
 */
export interface ResponseData<T = any> {
    code: number,
    data: T,
    message?: string,
}

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
        // requestCancelers.remove(response.config)
        switch (response.data.code) {
            case 200:
                return response
            case 401:
                console.error(response.data.message || '登录失效')
            case 403:
                // `token` 过期或者账号已在别处登录
                // 去登录页面
                router.push({ path: "/login", name: 'login' });
            default:
                return response
        }
    },
    (error: AxiosError) => {
        // requestCancelers.remove(error.config)
        let { message } = error
        if (message === 'Network Error') {

        }
        if (message.includes('timeout')) {
            message = '后端接口请求超时'
        }
        if (message.includes('Request failed with status code')) {
            const code = message.substr(message.length - 3)
            message = '后端接口' + code + '异常'
        }
        console.error(message || "API 未知异常")
    }
);

// 请求Content类型
enum ContentType {
    JSON = 'application/json;charset=UTF-8',
    FORM_UNLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export default {
    post<T = any>({ url, data }: AxiosRequestConfig): AxiosPromise<T> {
        return instance({
            method: "POST",
            headers: { 'Content-Type': ContentType.JSON },
            url,
            data,
        })
    },
    get<T = any>({ url, params }: AxiosRequestConfig): AxiosPromise<T> {
        return instance({
            method: "GET",
            url,
            params,
        })
    },
}