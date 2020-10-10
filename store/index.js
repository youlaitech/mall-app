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
			console.log('login', data)
			login(data)
				.then(res => {
					console.log("登陆成功", res)
					uni.setStorage({
						key: 'token',
						data: res.data.token,
						success:function() {
							state.hasLogin = true;
							state.userInfo = data.userInfo;
							uni.setStorage({
								key: 'userInfo',
								data: data.userInfo
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
		}
	},
	actions: {

	}
})

export default store
