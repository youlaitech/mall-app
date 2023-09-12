<template>
	<view class="content">
		<!-- 订单列表顶部tab页切换 -->
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view v-for="(order, index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">{{ order.createTime }}</text>
							<text class="status" style="#fa436a">{{order.status|orderStatusFilter}}</text>
							<!-- 已关闭订单可删除 -->
							<text v-if="order.status === 102 || order.status === 103"
								class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(order.id)"></text>
						</view>
						<scroll-view v-if="order.orderItems.length > 1" class="goods-box" scroll-x>
							<view v-for="(orderItem, itemIndex) in order.orderItems" :key="itemIndex"
								class="goods-item">
								<image class="goods-img" :src="orderItem.picUrl" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view v-if="order.orderItems.length === 1" class="goods-box-single"
							v-for="(orderItem, itemIndex) in order.orderItems" :key="itemIndex">
							<image class="goods-img" :src="orderItem.picUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ orderItem.spuName }}</text>
								<text class="attr-box">{{ orderItem.skuName }} x {{ orderItem.quantity }}</text>
								<text class="price">{{ orderItem.price | moneyFormatter }}</text>
							</view>
						</view>
						<view class="price-box">
							共<text class="num">{{ order.totalQuantity }}</text>件商品 实付款
							<text class="price">{{ order.paymentAmount | moneyFormatter }}</text>
						</view>
						<view class="action-box b-t" v-if="order.status === 101">
							<button class="action-btn" @click="cancelOrder(order)">取消订单</button>
							<button class="action-btn recom" @click="doPay(order)">立即支付</button>
						</view>
					</view>
					
					
					<uni-load-more :status="tabItem.loadingType" @clickLoadMore="clickLoadMore"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import empty from "@/components/empty";
	import Json from "@/Json";
	import {
		cancelOrder,
		deleteOrder,
		listOrdersWithPage
	} from "@/api/oms/order.js";

	const orderStatusMap = {
		101: '待付款',
		102: '用户取消',
		103: '系统取消',
		201: '已付款',
		202: '申请退款',
		203: '已退款',
		301: '待发货',
		401: '已发货',
		501: '用户收货',
		502: '系统收货',
		901: '已完成'
	}

	export default {
		filters: {
			orderStatusFilter(status) {
				return orderStatusMap[status]
			}
		},
		components: {
			uniLoadMore,
			empty,
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				reload: false,
				status: "more",
				contentText: {
					contentdown: "上拉加载更多~",
					contentrefresh: "加载中",
					contentnomore: "我是有底线的~",
				},
				tabCurrentIndex: 0,
				navList: [{
						status: 0,
						text: "全部",
						loadingType: "more",
						orderList: [],
					},
					{
						status: 101,
						text: "待付款",
						loadingType: "more",
						orderList: [],
					},
					{
						status: 201,
						text: "已付款",
						loadingType: "more",
						orderList: [],
					},
					{
						status: 301,
						text: "待发货",
						loadingType: "more",
						orderList: [],
					},
					{
						status: 901,
						text: "已完成",
						loadingType: "more",
						orderList: [],
					}
				]

			};
		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			console.log('========>> 进入订单列表页面, 路径：', this.$mp.page.route, '参数：', options);
			this.tabCurrentIndex = this.navList.map(item => item.status).indexOf(parseInt(options.status));
			this.loadData();

		},

		methods: {
			loadData() {
				let navItem = this.navList[this.tabCurrentIndex]
				let status = navItem.status
				if (navItem.loadingType === "loading") {
					return;
				}
				navItem.loadingType = "loading";
				this.pageNum = this.pageNum++;
				setTimeout(() => {
					const orderStatus = status == 0 ? null : status
					const params = {
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						status: orderStatus
					}
					listOrdersWithPage(params).then((response) => {
						console.log('订单列表数据', response.data.list)
						navItem.orderList = response.data.list;
					});
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, "loaded", true);

					//判断是否还有数据， 有改为 more， 没有改为noMore
					navItem.loadingType = "more";

				}, 600);
			},

			// 切换Tab
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData("tabChange");
			},
			// 顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			// 删除订单
			deleteOrder(id) {
				console.info('========订单删除========', id);
				uni.showModal({
					content: "删除订单？",
					success: (e) => {
						if (e.confirm) {
							deleteOrder(id).then((response) => {
								// 调用订单刷新接口，刷新数据
								this.loadData();
							});
						}
					},
				});
			},

			// 取消订单
			cancelOrder(item) {
				console.info('========订单取消========', item);
				uni.showLoading({
					title: "请稍后",
				});
				setTimeout(() => {
					cancelOrder(item.id).then((response) => {
						uni.hideLoading();
						this.loadData();
					});
				}, 600);
			},
			// 订单支付
			doPay(order) {
				console.info('========订单支付========');

                uni.redirectTo({
                    url: '/pages/money/pay?orderSn=' + order.orderSn + '&paymentAmount=' + order.paymentAmount
                });
			}
		},
	};
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: "";
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.status {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: "";
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: "￥";
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: "￥";
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}

	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999;
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.uni-load-more__img>view {
		position: absolute;
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite;
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0;
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
