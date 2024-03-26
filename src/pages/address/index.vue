<template>
    <view class="content b-t">
        <view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
            <view class="wrapper">
                <view class="address-box">
                    <text v-if="item.defaulted == 1" class="tag">默认</text>
                    <text class="address">{{ item.province }}{{ item.city }}{{ item.area }} {{ item.detailAddress }}</text>
                </view>
                <view class="u-box">
                    <text class="name">{{ item.consigneeName }}</text>
                    <text class="mobile">{{ item.consigneeMobile }}</text>
                </view>
            </view>
            <text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
        </view>

        <button class="add-btn" @click="onAddAddress('add')">新增地址</button>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { getAddressList } from '@/api/member';

// 定义响应式数据
const source = ref(0);
const addressList = ref([]);

// Vuex store 和 Vue Router
const store = useStore();
const router = useRouter();
const route = useRoute();

// 计算属性替换
const memberId = computed(() => store.getters.memberId);

// 获取地址列表的方法
const loadAddressData = () => {
    getAddressList(memberId.value).then(({ data }) => {
        console.log('获取会员地址', data);
        addressList.value = data;
    });
};

// 选择地址
const checkAddress = (item) => {
    if (source.value == 1) {
        // 由于 $api.prePage() 在App.vue定义，且Vue 3不再直接支持this.$api的方式，你可能需要找到一个替代方案，例如使用全局状态管理或事件总线
        // this.$api.prePage().selectedAddress = item;
        router.back();
    }
};

// 添加地址
const onAddAddress = (type, item) => {
    router.push({
        path: `/pages/address/addAddress`,
        query: { type: type, data: JSON.stringify(item) },
    });
};

onMounted(() => {
    console.log('========>> 进入会员地址列表页面, 路径：', route.path, '参数：', route.query);
    source.value = route.query.source;
    loadAddressData();
});
</script>
<style lang="scss">
page {
    padding-bottom: 120upx;
}

.content {
    position: relative;
}

.list {
    display: flex;
    align-items: center;
    padding: 20upx 30upx;
    background: #fff;
    position: relative;
}

.wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.address-box {
    display: flex;
    align-items: center;

    .tag {
        font-size: 24upx;
        color: $base-color;
        margin-right: 10upx;
        background: #fffafb;
        border: 1px solid #ffb4c7;
        border-radius: 4upx;
        padding: 4upx 10upx;
        line-height: 1;
    }

    .address {
        font-size: 30upx;
        color: $font-color-dark;
    }
}

.u-box {
    font-size: 28upx;
    color: $font-color-light;
    margin-top: 16upx;

    .name {
        margin-right: 30upx;
    }
}

.icon-bianji {
    display: flex;
    align-items: center;
    height: 80upx;
    font-size: 40upx;
    color: $font-color-light;
    padding-left: 30upx;
}

.add-btn {
    position: fixed;
    left: 30upx;
    right: 30upx;
    bottom: 16upx;
    z-index: 95;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 690upx;
    height: 80upx;
    font-size: 32upx;
    color: #fff;
    background-color: $base-color;
    border-radius: 10upx;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
