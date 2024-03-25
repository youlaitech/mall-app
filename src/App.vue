<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useAuthStore } from '@/state/modules/auth';
onLaunch(() => {
    console.log('App Launch');
});
onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>
<style lang="scss">
@import '@/assets/main.scss';
@import 'nutui-uniapp/styles/index';
</style>
