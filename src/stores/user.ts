import { defineStore } from 'pinia'
import { QR } from "~/api/login";
import _ from "lodash";


export interface Account {
    id: number
    userName: string
    type: number
    status: 0
    salt: string
    ban: number
    anonimousUser: boolean
    vipType: number
    vipTypeVersion: number
    whitelistAuthority: number
}


export const useUserStore = defineStore({
    id: 'user',
    state() {
        const token = sessionStorage.getItem("token")
        return {
            account: {},
            token
        }
    },
    actions: {
        // /**
        //  * 手机登录
        //  * @param form 手机登录表单
        //  * @returns 成功与否
        //  */
        // async phoneLogin(form: { phone: string, password: string }) {
        //     const { account, token, cookie } = (await request.post<{ account: Account, token: string, cookie: string }>({ url: "netease/login/cellphone", data: form })).data
        //     this.token = token
        //     sessionStorage.setItem("token", token)
        //     this.cookie = cookie
        //     document.cookie = cookie
        //     this.account = account
        // },
        // async QRCodeLogin() {
        //     const { data: { unikey } } = await QR.key()
        //     const { data: { qrimg, qrurl } } = await QR.image(unikey)
        //     this.qrimg = qrimg

        //     const polling = async () => {
        //         const { code, cookie } = await QR.check(unikey)
        //         switch (code) {
        //             case 800:
        //                 const { data: { qrimg, qrurl } } = await QR.image(unikey)
        //                 this.qrimg = qrimg
        //                 break
        //             case 801:
        //                 break
        //             case 802:
        //                 break
        //             case 803:
        //                 this.cookie = cookie
        //                 document.cookie = cookie
        //                 sessionStorage.setItem("cookie", cookie)
        //                 return
        //             default:
        //                 break
        //         }
        //         setTimeout(() => { polling() }, 4096)
        //     }
        //     polling()
        // }
    }
})