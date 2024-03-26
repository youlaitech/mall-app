<template>
    <view class="content">
        <view class="row b-b">
            <text class="tit">联系人</text>
            <input class="input" type="text" v-model="addressData.consigneeName" placeholder="收货人姓名" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">手机号</text>
            <input class="input" type="number" v-model="addressData.consigneeMobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
        </view>
        <view class="row b-b">
            <text class="tit">地址</text>
            <text @click="openPicker" class="input"> {{ addressData.province }}{{ addressData.city }}{{ addressData.area }} </text>

            <text class="yticon icon-shouhuodizhi"></text>
        </view>
        <view class="row b-b">
            <text class="tit">详细</text>
            <input class="input" type="text" v-model="addressData.detailAddress" placeholder="街道、楼号、门牌" placeholder-class="placeholder" />
        </view>

        <view class="row default-row">
            <text class="tit">设为默认</text>
            <switch :checked="addressData.defaulted == 1" color="#fa436a" @change="switchChange" />
        </view>
        <button class="add-btn" @click="confirm">提交</button>
    </view>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue';
import { addAddress, updateAddress } from '@/api/member';

// 你可以直接在此处引入其他组件
// import LotusAddress from '@/components/LotusAddress';

const router = useRouter();
const route = useRoute();

// 创建响应式的状态对象
const addressData = reactive({
    id: undefined,
    consigneeName: '',
    consigneeMobile: '',
    addressName: '在地图选择',
    detailAddress: '',
    area: '',
    default: false,
});

const lotusAddressData = reactive({
    visible: false,
    provinceName: '',
    cityName: '',
    townName: '',
});

const region = ref('');

// 副作用在onMounted钩子中触发
onMounted(() => {
    console.log('进入会员地址管理页面, 路径：', route.path);
    let title = '新增收货地址';
    // 此处判断了路由参数以决定是编辑还是新增地址
    if (route.query.type === 'edit' && route.query.data) {
        title = '编辑收货地址';
        const data = JSON.parse(route.query.data as string);
        Object.assign(addressData, data);
    } else {
        Object.assign(addressData, {
            province: '上海',
            city: '上海市',
            area: '浦东新区',
        });
    }
    document.title = title;
});

const switchChange = (event: Event) => {
    const e = event as CustomEvent;
    addressData.default = !!e.detail;
};

const confirm = async () => {
    if (!addressData.consigneeName) {
        alert('请输入收货人姓名');
        return;
    }
    // ... 这里可以添加更多校验

    try {
        let response;
        if (addressData.id) {
            response = await updateAddress(addressData.id, addressData);
        } else {
            response = await addAddress(addressData);
        }
        // 根据实际情况处理response
        console.log(response);
        router.back();
    } catch (error) {
        console.error('保存地址出错', error);
        alert('保存地址失败');
    }
};

// 通过toRefs将reactive对象转换为一组ref对象，这样可以解构且保持响应性
export const { id, consigneeName, consigneeMobile, addressName, detailAddress, area, default: defaultAddress } = toRefs(addressData);

export const { visible, provinceName, cityName, townName } = toRefs(lotusAddressData);

export { region, switchChange, confirm };
</script>

<style lang="scss">
page {
    background: $page-color-base;
    padding-top: 16upx;
}

.row {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30upx;
    height: 110upx;
    background: #fff;

    .tit {
        flex-shrink: 0;
        width: 120upx;
        font-size: 30upx;
        color: $font-color-dark;
    }

    .input {
        flex: 1;
        font-size: 30upx;
        color: $font-color-dark;
    }

    .icon-shouhuodizhi {
        font-size: 36upx;
        color: $font-color-light;
    }
}

.default-row {
    margin-top: 16upx;

    .tit {
        flex: 1;
    }

    switch {
        transform: translateX(16upx) scale(0.9);
    }
}

.add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 690upx;
    height: 80upx;
    margin: 60upx auto;
    font-size: $font-lg;
    color: #fff;
    background-color: $base-color;
    border-radius: 10upx;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
