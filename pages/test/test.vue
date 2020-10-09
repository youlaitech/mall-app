<template>
	<view>
		<button class="confirm-btn" open-type="getUserInfo" @click="toLogin" :disabled="logining">登录</button>

		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">小程序登录授权</button>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			...mapMutations(['login']),
			async toLogin() {
				console.log('toLogin')
				this.logining = true;
				this.login()
			},

			getUserInfo() {
				let _this = this
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (login) => {
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口

											_this.login({
												 grant_type:'password',
												 client_id:'youlai-mall-weapp',
												 client_secret:'123456',
												code: login.code,
												encryptedData: info.encryptedData,
												iv: info.iv,
												userInfo: info.userInfo
											})
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				// #endif

			}

		}
	}
</script>

<style>

</style>
