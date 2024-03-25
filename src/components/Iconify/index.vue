<script lang="ts" setup name="Iconify">
import { assign } from 'lodash-es';
import { isBoolean } from '@/utils/is';

const props = defineProps({
    icon: {
        type: String,
    },
    size: {
        type: [Number, String],
    },
    color: {
        type: String,
    },
});

const iconSize = computed<string | boolean>(() => (props.size ? `${props.size}rpx` : false));
let style = computed(() => {
    let ISize = unref(iconSize);
    return assign({ width: isBoolean(ISize) ? '' : ISize, height: isBoolean(ISize) ? '' : ISize }, { color: props.color });
});

const emit = defineEmits(['click']);
const onClick = () => {
    emit('click');
};
</script>
<template>
    <view ref="elRef" @click="onClick" :class="['iconify', icon]" :style="style"></view>
</template>
<style lang="scss" scoped>
.iconify {
    display: inline-block;
    vertical-align: middle;
    height: 44rpx;
    width: 44rpx;
    color: inherit;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
}
</style>
