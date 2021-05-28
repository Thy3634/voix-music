import { defineStore } from 'pinia'
import { Notify } from 'vant'
import request from '~/utils/axios/request'

export const useUserStore = defineStore({
    id: 'user',
    state() {
        const token = sessionStorage.getItem("token")
        return {
            account: {},
            token,
        }
    },
    actions: {
        /**
         * 手机登录
         * @param form 手机登录表单
         * @returns 成功与否
         */
        async phoneLogin(form: any) {
            try {
                const data = await request.post({ url: "netease/login/cellphone", data: form })
                const { code, loginType, account, token } = data
                console.assert(code == 200 && loginType == 1, `code${code}`)
                this.token = token
                sessionStorage.setItem("token", token)
                this.account = account
                return true
            } catch (error) {
                switch (error.code) {
                    case 502:
                        Notify({ type: "warning", message: error.message })
                        break;
                    default:
                        Notify({ type: "danger", message: "登录失败" })
                        break;
                }
                return false
            }
        }
    }
})