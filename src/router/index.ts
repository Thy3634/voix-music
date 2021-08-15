import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { after, before } from "./guards";
import routes from "virtual:generated-pages";

routes.push({
    path: "/",
    name: "/",
    redirect: "/opening",
})

const router = createRouter({
    history: createWebHashHistory(),
    // 添加静态路由
    routes,
});

router.beforeEach(before)
router.afterEach(after)

export default router