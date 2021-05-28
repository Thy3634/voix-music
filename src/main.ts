import { createApp } from 'vue'
import App from './App.vue'
// 全局样式
import "~/styles/iconfont.css"
import router from "~/router";
import { createPinia } from 'pinia'

const app = createApp(App)
    .use(router)
    .use(createPinia())

app.mount('#app')
