import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 30000,
})

// 请求Content类型
enum ContentType {
    MPEG = 'audio/mpeg',
}

export default {
    mpeg({ url }: AxiosRequestConfig): AxiosPromise<ArrayBuffer> {
        return instance({
            url,
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                'Content-Type': ContentType.MPEG
            }
        })
    }
}