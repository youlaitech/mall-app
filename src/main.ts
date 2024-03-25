import { createSSRApp } from 'vue';
import App from './App.vue';
import 'uno.css';
import { setupStore } from '@/state';
import { setupRouter } from '@/router';

export function createApp() {
    const app = createSSRApp(App);

    // Configure router
    setupRouter(app);

    // Configure store
    setupStore(app);

    return {
        app,
    };
}
