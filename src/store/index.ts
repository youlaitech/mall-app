import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
    app.use(store);
}

export * from './modules/app';
export * from './modules/member';
export * from './modules/auth';
export { store };
