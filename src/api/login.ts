import axios from "axios";

export const QR = {
    key: async function () {
        return (await axios.get<{ data: { unikey: string } }>("netease/login/qr/key")).data
    },
    /**
     * @param key from QR.key()
     * @returns {qrimg, qrurl} qrimg: base64
     */
    image: async function (key: string) {
        return (await axios.post<{ data: { qrimg: string, qrurl: string } }>("netease/login/qr/create", { key, qrimg: true })).data
    },
    check: async function (key: string) {
        return (await axios.post<{ code: number, cookie: string, message: string }>("netease/login/qr/check", { key })).data
    }
}

export async function phone(phone: string, password: string) {
    return (await axios.post<{ code: number, account: { id: number, userName: string, salt: string }, cookie: string, token: string, profile: { avatarUrl: string, backgroundUrl: string, nickname: string, birthday: number, city: number } }>('netease/login/cellphone', { phone, password })).data
}