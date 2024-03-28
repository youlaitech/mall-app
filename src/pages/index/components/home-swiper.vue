<template>
    <view>
        <swiper
            class="swiper"
            circular
            indicator-active-color="#fff"
            indicator-color="rgba(255,255,255,0.6)"
            :indicator-dots="true"
            :autoplay="true"
            :interval="3000"
            :duration="1000"
        >
            <swiper-item class="swiper-item">
                <image mode="aspectFill" class="swiper-item-img" src="https://img.zcool.cn/community/018b2d599bf315a80121ad7b7e5bfd.jpg@2o.jpg"> </image>
            </swiper-item>
            <swiper-item class="swiper-item">
                <image mode="aspectFill" class="swiper-item-img" src="https://img.zcool.cn/community/011fc458b9313da801219c7788e1e1.jpg@1280w_1l_2o_100sh.jpg">
                </image>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.swiper {
    height: 304rpx;
    .swiper-item {
        @apply flex-center;
        width: 100%;
        height: 100%;
    }
    .swiper-item-img {
        width: 686rpx;
        height: 100%;
    }
}
</style>
