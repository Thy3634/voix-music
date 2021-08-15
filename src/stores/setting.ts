import { defineStore } from "pinia";

type Player = "swiper" | "classic"
type Scheme = "dark" | "light"
export const useSettingStore = defineStore({
    id: "setting",
    state() {
        return {
            lang: document.querySelector('html')!.getAttribute('lang'),
            scheme: document.querySelector('html')!.classList.contains('dark') ? 'dark' : 'light' as Scheme,
            player: "swiper" as Player,
        }
    },
    actions: {
        /**
         * 切换主题
         */
        toggleScheme() {
            switch (this.scheme) {
                case "dark":
                    this.scheme = "light"
                    document.querySelector('html')!.classList.remove('dark')
                    break
                default:
                    this.scheme = "dark"
                    document.querySelector('html')!.classList.add('dark')
                    break
            }
            localStorage.setItem('scheme', this.scheme)

        },
        /**
         * respect the OS preference
         */
        OSScheme() {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches && this.scheme != 'dark') {
                this.toggleScheme()
            }
            localStorage.setItem('scheme', 'OS')
        }
    }
})