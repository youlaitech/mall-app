/**
 * router
 * @see https://gitee.com/fant-mini/uni-mini-router
 */
import { createRouter } from 'uni-mini-router';
import { App } from 'vue';
import { createRouterGuard } from '@/router/guard';

const router = createRouter({
    routes: [...ROUTES], // 路由表信息
});

export function setupRouter(app: App<Element>) {
    // Configure router guard
    createRouterGuard(router);
    app.use(router);
}

export { router };
