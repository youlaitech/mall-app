<template>
    <view class="container">
        <!-- #ifdef MP -->
        <nut-button block type="primary">小程序登录授权</nut-button>
        <view class="text-xs mt-2"> 温馨提示:未注册有来小店的用户,初次登录时将完成注册 </view>
        <!-- #endif -->

        <!-- #ifndef MP -->
        <view class="form-wrap">
            <form class="form" @submit="submitLogin">
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
import { Toast } from '@/utils/uniapi/prompt';
import { HOME_PAGE } from '@/enums/routerEnum';
import { useMemberStore, useAuthStore } from '@/store';
const router = useRouter();
const pageQuery = ref<Record<string, any> | undefined>(undefined);

onLoad((query) => {
    pageQuery.value = query;
});

const form = reactive({
    mobile: '18866668888',
    code: '666666',
});

const submitLogin = (e: any) => {
    useAuthStore()
        .login(e.detail.value)
        .then(
            () => {
                Toast('登录成功', { duration: 1500 });
                useMemberStore()
                    .getMemberInfo()
                    .then(() => {
                        const pages = getCurrentPages();
                        if (pages.length > 1) {
                            uni.navigateBack();
                        } else {
                            console.log('跳转首页');
                            uni.switchTab({
                                url: '/pages/index/index',
                            });
                        }
                    });
            },
            () => {
                Toast('登录失败', { duration: 1500 });
            },
        );
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
@/services/api/auth/auth @/api/auth @/store/modules/auth
