import { defineStore } from 'pinia';
import { login as loginApi, logout as logoutApi } from '@/api/auth';
import { getCache, removeCache, setCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { LoginData } from '@/api/auth/types';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(getCache(TOKEN_KEY));

    const isLogin = computed(() => !!token.value);

    const setToken = (val: string | undefined) => {
        setCache(TOKEN_KEY, val);
        token.value = val;
    };

    // 使用function关键字定义login函数
    function login(loginData: LoginData) {
        return new Promise((resolve, reject) => {
            loginApi(loginData)
                .then((data) => {
                    setToken(data.token_type + ' ' + data.access_token);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // 使用function关键字定义loginOut函数
    function logout() {
        return new Promise((resolve, reject) => {
            logoutApi()
                .then(() => {
                    removeCache(TOKEN_KEY);
                    resolve(null);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return {
        token,
        isLogin,
        setToken,
        login,
        logout,
    };
});
