import { ActionsTree, defineStore, GettersTree, StateTree } from "pinia";

export enum Lang {
    zh_CN = "zh-CN",
    en = "en"
}
enum Theme {
    light = "light",
    dark = "dark"
}

export const useSettingStore = defineStore({
    id: "setting",
    state() {
        return {
            lang: Lang.zh_CN,
            theme: Theme.dark
        }
    },
    actions: {
        /**
         * 匹配系统设置，初始化深色模式或亮色模式。
         */
        initTheme() {
            const cachedTheme = localStorage.getItem('theme')
            const userPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches

            if (cachedTheme) this.theme = cachedTheme as Theme
            else if (userPrefersDark) this.theme = Theme.dark
            else this.theme = Theme.light
        },
        /**
         * 切换主题并缓存
         */
        toggleTheme() {
            switch (localStorage.theme) {
                case 'light':
                    this.theme = Theme.dark
                    break
                default:
                    this.theme = Theme.light
                    break
            }
            document.querySelector('#app')?.setAttribute('data-theme', this.theme)
            localStorage.setItem('theme', this.theme)
        },
    }
})