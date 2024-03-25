<script lang="ts" setup>
const props = defineProps({
    text: {
        type: String,
        default: 'text',
    },
});

const text = 'TEXT: ' + props.text;
</script>
<template>
    <view>{{ text }}</view>
</template>
<style lang="scss" scoped></style>
