// / <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_ENV: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_API_URL: string;
    readonly VITE_UPLOAD_URL: string;
    readonly VITE_APP_CACHE_PREFIX: string;
    readonly VITE_PORT: number;
    readonly VITE_USE_MOCK: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
