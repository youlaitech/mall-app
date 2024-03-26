// Vite中文网：https://vitejs.cn/config/
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import TransformPages from 'uni-read-pages-vite'; // vite.config.ts
import AutoImport from 'unplugin-auto-import/vite';

import Components from '@uni-helper/vite-plugin-uni-components';
import { NutResolver } from 'nutui-uniapp';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    return {
        base: './',
        // 设置路径别名
        resolve: {
            alias: {
                '@': resolve('./src'),
            },
            extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        // 自定义全局变量
        define: {
            'process.env': {},
            ROUTES: new TransformPages().routes,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "nutui-uniapp/styles/variables.scss";',
                },
            },
        },
        // 开发服务器配置
        server: {
            host: true,
            // open: true,
            port: env.VITE_PORT as any,
            proxy: {
                [String(env.VITE_APP_BASE_API)]: {
                    target: env.VITE_APP_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
                },
                '/upload': {
                    target: env.VITE_APP_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/upload/, ''),
                },
            },
        },
        // 构建配置
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].${new Date().getTime()}.js`,
                    chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
                    assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
                    compact: true,
                    // manualChunks: {
                    //     vue: ['vue', 'vue-router', 'vuex'],
                    //     echarts: ['echarts'],
                    // },
                },
            },
        },
        // 插件
        plugins: [
            Components({
                resolvers: [NutResolver()],
                dirs: ['src/components', 'src/**/components'],
                dts: 'src/typings/components.d.ts',
            }),
            // 自动导入
            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                ],
                imports: [
                    'vue',
                    'uni-app',
                    'pinia',
                    {
                        'uni-mini-router': ['useRouter', 'useRoute'],
                    },
                ],
                dts: 'src/typings/auto-imports.d.ts',
                eslintrc: {
                    enabled: true,
                },
            }),
            uni(),
            Unocss(),
        ],
    };
};
