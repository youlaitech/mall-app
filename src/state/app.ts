import { defineStore } from 'pinia';

interface AppState {
    sys?: string | number;
}

export const useAppStore = defineStore({
    id: 'app-store',
    state: (): AppState => ({}),
    getters: {},
    actions: {},
});
