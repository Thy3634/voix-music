import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/opening",
        name: "/",
    },
    {
        path: "/opening",
        name: "opening",
        component: () => import("#/opening.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("#/login.vue")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("#/home/index.vue")
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        component: () => import("#/404.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    // 添加静态路由
    routes: routes,
});

export default router