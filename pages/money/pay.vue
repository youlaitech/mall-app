<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ paymentAmount | moneyFormatter }}</text>
		</view>

		<!--<view class="container">
			<image src="/static/wxpay.png" @click="previewImage"></image>
		</view> -->

		<view class="pay-type-list">
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥{{ balance | moneyFormatter }}</text>
				</view>
				<label class="radio"><radio value="" color="#fa436a" :checked="payType == 3"></radio></label>
			</view>

			<view class="type-item b-b" @click="changePayType('WX_JSAPI')">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio"><radio value="" color="#fa436a" :checked="payType == 1" /></label>
			</view>

			<view class="type-item b-b" @click="changePayType('ALIPAY')">
				<text class="icon yticon icon-alipay"></text>
				<view class="con"><text class="tit">支付宝支付</text></view>
				<label class="radio"><radio value="" color="#fa436a" :checked="payType == 2"></radio></label>
			</view>
		</view>
		<text class="mix-btn" @click="pay">确认支付</text>
	</view>
</template>

<script>
import { pay } from '@/api/oms/order.js';
import {
		mapGetters
	} from 'vuex';
export default {
	data() {
		return {
			payType: 'BALANCE', // 支付方式 1-微信 2-支付宝 3-会员余额
			orderSn: undefined,
			paymentAmount: 0,
			data: {
				imgalist: ['@/static/wxpay.png']
			}
		};
	},
	onLoad(options) {
		console.log('========>> 进入支付页面, 路径：', this.$mp.page.route, '参数：', options);
		this.orderSn = options.orderSn;
		this.paymentAmount = options.paymentAmount;
	},
	computed: {
		...mapGetters(['balance'])
	},
	methods: {
		//选择支付方式
		changePayType(type) {
			this.payType = type;
		},
		pay() {
			console.info('========付款开始========');
			pay({
				'orderSn':this.orderSn,
				'paymentMethod':this.payType
				
			}).then(response => {
				console.log('订单付款结果',response)
				uni.showToast({
					title: '订单支付成功',
					icon: 'success',
					duration: 2000
				});
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				});
			});
		},

		previewImage(e) {
			const current = e.target.dataset.src;
			wx.previewImage({
				current: current,
				urls: this.data.imgalist
			});
		}
	}
};
</script>

<style lang="scss">
.app {
	width: 100%;
}

.price-box {
	background-color: #fff;
	height: 265upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	color: #909399;

	.price {
		font-size: 50upx;
		color: #303133;
		margin-top: 12upx;

		&:before {
			content: '￥';
			font-size: 40upx;
		}
	}
}

.pay-type-list {
	margin-top: 20upx;
	background-color: #fff;
	padding-left: 60upx;

	.type-item {
		height: 120upx;
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 60upx;
		font-size: 30upx;
		position: relative;
	}

	.icon {
		width: 100upx;
		font-size: 52upx;
	}

	.icon-erjiye-yucunkuan {
		color: #fe8e2e;
	}

	.icon-weixinzhifu {
		color: #36cb59;
	}

	.icon-alipay {
		color: #01aaef;
	}

	.tit {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 4upx;
	}

	.con {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-sm;
		color: $font-color-light;
	}
}

.mix-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 630upx;
	height: 80upx;
	margin: 80upx auto 30upx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
