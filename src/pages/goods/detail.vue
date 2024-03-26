<template>
    <view>
        <swiper class="carousel" indicator-dots="true" circular="true" interval="3000" duration="700">
            <swiper-item v-for="(item, index) in data.imgList" :key="index">
                <view class="image-wrapper">
                    <image :src="item.src" :class="item.loaded" mode="aspectFill" @load="imageOnLoad('imgList', index)"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="scroll-view-wrapper">
            <scroll-view class="episode-panel" :class="{ Skeleton: !loaded }" scroll-x>
                <view v-for="(item, index) in data.episodeList" :key="index" :class="{ current: currentEpd === item }" @click="changeEpd(index)">
                    {{ item }}
                </view>
            </scroll-view>
        </view>
        <view class="info">
            <view class="title">
                <text :class="{ Skeleton: !loaded }">{{ data.title }}</text>
                <text :class="{ Skeleton: !loaded }">{{ data.title2 }}</text>
            </view>
            <text class="yticon icon-xia"></text>
        </view>
        <view class="actions">
            <text class="yticon icon-fenxiang2" @click="share"></text>
            <text class="yticon icon-Group-"></text>
            <text class="yticon icon-shoucang" :class="{ active: data.favorite }" @click="favorite"></text>
        </view>

        <!-- 猜你喜欢 -->
        <view class="guess">
            <view class="section-tit">猜你喜欢</view>
            <view class="guess-list">
                <view v-for="(item, index) in data.guessList" :key="index" class="guess-item">
                    <view class="image-wrapper">
                        <image :src="item.src" :class="item.loaded" mode="aspectFill" @load="imageOnLoad('guessList', index)"></image>
                    </view>
                    <text class="title clamp" :class="{ Skeleton: !loaded }">{{ item.title }}</text>
                    <text class="clamp" :class="{ Skeleton: !loaded }">{{ item.title2 }}</text>
                </view>
            </view>
        </view>
        <!-- 评论 -->
        <view class="evalution">
            <view class="section-tit">评论</view>
            <view class="eva-list" :class="{ Skeleton: !loaded }">
                <view v-for="(item, index) in data.evaList" :key="index" class="eva-item">
                    <image :src="item.src" mode="aspectFill"></image>
                    <view class="eva-right">
                        <text>{{ item.nickname }}</text>
                        <text>{{ item.time }}</text>
                        <view class="zan-box">
                            <text>{{ item.zan }}</text>
                            <text class="yticon icon-shoucang"></text>
                        </view>
                        <text class="content">{{ item.content }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loaded = ref(false);
const currentEpd = ref(1);
const data = ref({ guessList: [{}, {}, {}, {}] });
const shareList = ref([]);
const title = ref('');

onMounted(async () => {
    const detailData = null;
    const shareData = null;
    loaded.value = true;
    data.value = detailData;
    shareList.value = shareData;
    title.value = detailData.title;
    uni.setNavigationBarTitle({
        title: detailData.title,
    });
});

const imageOnLoad = (key: string, index: number) => {
    data.value[key][index].loaded = 'loaded';
};

const changeEpd = (index: number) => {
    let list = data.value.episodeList;
    let epd = list[index];
    msg(`切换到第${epd}项`);
    currentEpd.value = epd;
};

const share = () => {
    // 这里需要一个引用来访问share组件的方法
};

const favorite = () => {
    data.value.favorite = !data.value.favorite;
};

// 处理遮罩层物理返回键的逻辑
const onBackPress = () => {
    // 需要访问share组件的状态
};
</script>

<style scoped lang="scss">
.carousel {
    height: 200px;
    .image-wrapper {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;

        image {
            width: 100%;
            height: 100%;
        }
    }
}
.scroll-view-wrapper {
    display: flex;
    align-items: center;
    height: 90upx;
    padding: 20upx 0 20upx 40upx;
    background: #fff;
}
.episode-panel {
    white-space: nowrap;
    width: 100%;
    view {
        display: inline-block;
        margin-right: 30upx;
        width: 56upx;
        font-size: $font-lg;
        color: $font-color-base;
        &.current {
            color: #07a7a7;
        }
    }
}

.info {
    display: flex;
    align-items: center;
    padding: 10upx 40upx;
    background: #fff;

    .title {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: $font-lg + 4upx;
        color: $font-color-dark;

        text:last-child {
            font-size: $font-sm;
            color: $font-color-light;
            margin-top: 4upx;
            &.Skeleton {
                width: 220upx;
            }
        }
    }
    .yticon {
        font-size: 44upx;
        color: $font-color-base;
        margin: 0 10upx 0 30upx;
    }
}

.actions {
    padding: 10upx 28upx;
    background: #fff;

    .yticon {
        font-size: 46upx;
        color: $font-color-base;
        padding: 10upx 12upx;
        &.active {
            color: #ff4443;
        }
        &:nth-child(2) {
            font-size: 50upx;
        }
    }
}

.section-tit {
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    margin-bottom: 30upx;
    text-align: center;
}

.guess {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30upx 40upx 10upx;
    margin-top: 16upx;
    background: #fff;
}

.guess-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.guess-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    min-width: 40%;
    margin-right: 26upx;
    padding-bottom: 40upx;

    &:nth-child(2n) {
        margin-right: 0;
    }

    image {
        width: 100%;
        height: 200upx;
        border-radius: 10upx;
    }

    text {
        font-size: $font-sm;
        color: $font-color-light;
        &.Skeleton {
            width: 180upx;
            &.title {
                width: 140upx;
            }
        }
        &.title {
            font-size: $font-base + 2upx;
            color: $font-color-dark;
            margin-top: 16upx;
            margin-bottom: 8upx;
        }
    }
}
.evalution {
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-top: 16upx;
    padding: 40upx 0;
}

.eva-item {
    display: flex;
    padding: 20upx 40upx;
    image {
        width: 60upx;
        height: 60upx;
        border-radius: 50px;
        flex-shrink: 0;
        margin-right: 24upx;
    }
}
.eva-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: $font-sm + 2upx;
    color: $font-color-light;
    position: relative;
    .zan-box {
        display: flex;
        align-items: base-line;
        position: absolute;
        top: 10upx;
        right: 10upx;
        .yticon {
            margin-left: 8upx;
        }
    }
    .content {
        font-size: $font-base;
        color: #333;
        padding-top: 20upx;
    }
}
</style>
