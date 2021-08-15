import { createApp } from 'vue'
import App from './App.vue'

import router from "~/router";
import { createPinia } from "pinia";

import '$/index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
        // 聚焦元素
        el.focus()
    }
})
app.mount('#app')