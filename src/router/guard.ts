import { useAuthStore } from '@/store';
import { Router } from 'uni-mini-router/lib/interfaces';

export function createRouterGuard(router: Router) {
    createBeforeEachGuard(router);
    createAfterEachGuard(router);
}

function createBeforeEachGuard(router: Router) {
    router.beforeEach((to, _, next) => {
        const authStore = useAuthStore();
        // @ts-ignore
        if (to && to?.meta?.ignoreAuth) {
            // 如果目标路由忽略验证直接跳转
            next();
        } else if (!authStore.isLogin && to && to.name !== 'Login') {
            // 如果没有登录且目标路由不是登录页面则跳转到登录页面
            // 将目标路由和参数传入登录页面，登录成功后直接跳转到目标路由，优化体验
            next({ name: 'Login', params: { redirect: to.name!, tabBar: to?.meta?.tabBar, ...to.query }, navType: 'push' });
        } else if (authStore.isLogin && to && to.name === 'Login') {
            // 如果已经登录且目标页面是登录页面则跳转至首页
            next({ name: 'Home', navType: 'replaceAll' });
        } else {
            next();
        }
    });
}

function createAfterEachGuard(router: Router) {
    router.afterEach((to) => {
        // @ts-ignore
        if (to && to?.meta?.ignoreAuth) return;
        const authStore = useAuthStore();
        if (!authStore.isLogin && to && to.name !== 'Login') {
            // 如果没有登录且目标路由不是登录页面则跳转到登录页面
            router.push({ name: 'Login', params: { tabBar: to?.meta?.tabBar, ...to.query } });
        } else if (authStore.isLogin && to && to.name === 'Login') {
            // 如果已经登录且目标页面是登录页面则跳转至首页
            router.replaceAll({ name: 'Home' });
        }
    });
}
