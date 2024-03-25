<template>
    <view class="container">
        <!-- #ifdef MP -->
        <nut-button block type="primary">小程序登录授权</nut-button>
        <view class="text-xs mt-2"> 温馨提示:未注册有来小店的用户,初次登录时将完成注册 </view>
        <!-- #endif -->

        <!-- #ifndef MP -->
        <view class="title">登录</view>
        <view class="form-wrap">
            <form class="form" @submit="submit">
                <label class="form-item">
                    <view class="form-label">手机号:</view>
                    <view class="form-element"><input name="mobile" :value="form.mobile" /></view>
                </label>
                <label class="form-item">
                    <view class="form-label">验证码:</view>
                    <view class="form-element"><input name="code" :value="form.code" /></view>
                </label>
                <button form-type="submit" class="submit-btn" hover-class="none">登录</button>
            </form>
        </view>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/state/modules/auth';
import { Toast } from '@/utils/uniapi/prompt';
import { useRequest } from 'alova';
import { login } from '@/api/auth';
import { omit } from 'lodash-es';
import { HOME_PAGE } from '@/enums/routerEnum';

const pageQuery = ref<Record<string, any> | undefined>(undefined);
onLoad((query) => {
    pageQuery.value = query;
});

const router = useRouter();

const form = reactive({
    mobile: '18866668888',
    code: '666666',
});
const authStore = useAuthStore();
const { send: sendLogin } = useRequest(login, { immediate: false });
const submit = (e: any) => {
    sendLogin(e.detail.value).then((res) => {
        Toast('登录成功', { duration: 1500 });
        authStore.setToken(res.token_type + ' ' + res.access_token);
        setTimeout(() => {
            if (unref(pageQuery)?.redirect) {
                // 如果有存在redirect(重定向)参数，登录成功后直接跳转
                const params = omit(unref(pageQuery), ['redirect', 'tabBar']);
                console.log('pageQuery', pageQuery, unref(pageQuery)?.tabBar);
                debugger;
                if (unref(pageQuery)?.tabBar) {
                    // 这里replace方法无法跳转tabbar页面故改为replaceAll
                    router.replaceAll({ name: unref(pageQuery).redirect, params });
                } else {
                    router.replace({ name: unref(pageQuery).redirect, params });
                }
            } else {
                router.replaceAll({ path: HOME_PAGE });
            }
        }, 1500);
    });
};
</script>

<style lang="scss" scoped>
.container {
    margin: 0 auto;
    width: 80%;

    .title {
        padding: 320rpx 0 32rpx 0;
        text-align: center;
    }

    .form-wrap {
        padding: 20rpx 24rpx;
        box-shadow: 16rpx 16rpx 30rpx #e5e7eb;

        .form {
            .form-item {
                display: flex;
                height: 88rpx;
                border-bottom: 2rpx solid #dbeafe;
                align-items: center;

                .form-label {
                    min-width: 96rpx;
                }

                .form-element {
                    flex-grow: 1;
                }
            }

            .submit-btn {
                margin-top: 44rpx;
                border: 4rpx solid #bfdbfe;
                background-color: #60a5fa;
                border-radius: 8rpx;
                font-size: 28rpx;
                color: #ffffff;

                :hover {
                    background-color: #3b82f6;
                }
            }
        }
    }
}
</style>
@/services/api/auth/auth @/api/auth
