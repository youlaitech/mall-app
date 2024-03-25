<script lang="ts" setup>
import { buttonProps } from '@/components/BasicButton/prpos';

const props = defineProps(buttonProps);
const emits = defineEmits(['click']);
const click = () => {
    emits('click');
};
</script>

<template>
    <view class="default-btn" :disabled="props.disabled" @tap="click">
        <slot></slot>
    </view>
</template>

<style lang="scss" scoped>
.default-btn {
    color: #fff;
    border-width: 4rpx;
    border-color: #bfdbfe;
    border-style: solid;
    border-radius: 6rpx;
    background-color: #60a5fa;
    padding: 12rpx 26rpx;
    display: inline-block;
    font-size: 24rpx;
    &:hover {
        background-color: #3b82f6;
    }
}
</style>
