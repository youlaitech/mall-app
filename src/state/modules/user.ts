import { defineStore } from 'pinia';

interface UserState {
    id?: string | number;
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({}),
    getters: {},
    actions: {},
});
