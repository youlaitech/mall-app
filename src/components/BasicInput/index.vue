<template>
    <input :type="type" :name="name" :value="value" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BasicInput',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        name: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
    },
    setup(_props) {
        // const _props = props;
        return {};
    },
});
</script>

<style lang="scss" scoped></style>
