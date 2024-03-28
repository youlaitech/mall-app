<template>
    <swiper
        class="swiper"
        :style="{
            height: 4 <= 4 ? '170rpx' : '360rpx',
        }"
    >
        <swiper-item class="swiper-item">
            <lyz-grid
                @tapGrid="tapGrid"
                :border="false"
                :columnNum="4"
                :columns="[
                    {
                        title: '美妆个护',
                        icon: 'http://www.liwanying.top/applate-icon/meizhuang2x.png',
                    },
                    {
                        title: '母婴',
                        icon: 'http://www.liwanying.top/applate-icon/muying2x.png',
                    },
                    {
                        title: '内衣',
                        icon: 'http://www.liwanying.top/applate-icon/neiyi2x.png',
                    },
                    {
                        title: '女装',
                        icon: 'http://www.liwanying.top/applate-icon/nvzhuang2x.png',
                    },
                ]"
            >
            </lyz-grid>
        </swiper-item>
    </swiper>
</template>

<script setup>
const tapGrid = () => {
    uni.showToast({
        icon: 'none',
        title: '正在开发中...',
    });
};
</script>

<style lang="scss" scoped></style>
