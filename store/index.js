import Vue from 'vue'
import Vuex from 'vuex'
import {
	login
} from '@/api/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {}
	},
	mutations: {
		login(state, data) {
			login(data)
				.then(res => {
					console.log('登录成功', res.data)
					uni.setStorage({
						key: 'token',
						data: res.data.token,
						success: function() {
							state.hasLogin = true;
							state.userInfo = res.data.userInfo;
							uni.setStorage({
								key: 'userInfo',
								data: res.data.userInfo
							})
						}
					})

				})
				.catch(err => {
					console.log(err)
				})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'token'
			})
		}
	},
	actions: {

	}
})

export default store
