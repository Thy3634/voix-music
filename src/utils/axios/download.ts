import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 100000,
})

// 请求Content类型
export enum ContentType {
    MPEG = 'audio/mpeg',
}

export default {
    async mp3({ url }: AxiosRequestConfig): Promise<ArrayBuffer> {
        return (await instance({
            url,
            method: "GET",
            responseType: "arraybuffer",
            headers: {
                'Content-Type': ContentType.MPEG
            }
        })).data
    }
}