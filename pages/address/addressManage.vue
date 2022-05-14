<template>


	<view class="content">
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.consigneeName" placeholder="收货人姓名"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.consigneeMobile" placeholder="收货人手机号码"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">


			<text class="tit">地址</text>
			<!-- <text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text> -->
			<text @click="openPicker" class="input">
				{{addressData.province}}{{addressData.city}}{{addressData.area}}
			</text>


			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">详细</text>
			<input class="input" type="text" v-model="addressData.detailAddress" placeholder="街道、楼号、门牌"
				placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaulted==1" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	import {
		add,
		update
	} from '@/api/ums/address.js';

	export default {
		components: {
			"lotus-address": lotusAddress
		},
		data() {
			return {
				addressData: {
					id: undefined,
					consigneeName: '',
					consigneeMobile: '',
					addressName: '在地图选择',
					detailAddress: '',
					area: '',
					default: false
				},
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				region: ''
			}
		},
		onLoad(option) {
			console.log('========>> 进入会员地址管理页面, 路径：', this.$mp.page.route, '参数：', option);
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
			} else {
				this.addressData = {
					province: '上海',
					city: '上海市',
					area: '浦东新区',

				}
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e) {
				if (e.detail) {
					this.addressData.defaulted = 1
				} else {
					this.addressData.defaulted = 0
				}
			},

			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},

			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
				this.lotusAddressData.provinceName = this.addressData.province;
				this.lotusAddressData.cityName = this.addressData.city;
				this.lotusAddressData.townName = this.addressData.area;
			},
			//回传已选的省市区的值
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.province; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值

					const {
                        province,
                        city,
                        town
                    } = res

                    this.addressData.province = province
					this.addressData.city = city
					this.addressData.area = town
				}
			},

			//提交
			confirm() {
				let data = this.addressData;
				if (!data.consigneeName) {
					this.$api.msg('请填写联系人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.consigneeMobile)) {
					this.$api.msg('请输入正确的手机号');
					return;
				}
				if (!data.area) {
					this.$api.msg('请选择省市区');
					return;
				}
				if (!data.detailAddress) {
					this.$api.msg('请填写详细地址');
					return;
				}

				if (data.id) {
					update(data.id, data).then(response => {
						console.log('修改地址响应', response)
						this.$api.prePage().refreshList(data, this.manageType);
						this.$api.msg(`地址修改成功`);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					})

				} else {
					add(data).then(response => {
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						console.log("添加地址响应", response)
						this.$api.prePage().refreshList(data, this.manageType);
						this.$api.msg(`地址添加成功`);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					})
				}
			},
		}
	}
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
			transform: translateX(16upx) scale(.9);
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
