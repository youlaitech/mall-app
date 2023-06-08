import axios from 'axios'
import store from '@/store'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
	 baseURL: "https://api.youlai.tech", //  线上接口地址(微信、HBX内置浏览器)
	// baseURL: "http://app.youlai.tech/prod-api", // 线上接口地址(谷歌等有跨域限制浏览器)
	// baseURL: "http://localhost:9999", // 本地开发环境地址
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
		if (config.headers.auth === true) { // 判断请求是否需要认证
			const token = uni.getStorageSync('token')
			if (token) {
				config.headers['Authorization'] = token;
			}
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

service.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}


// response interceptor
service.interceptors.response.use(({
		config,
		data
	}) => {
		return data
	},
	error => {
		const {
			code,
			msg
		} = error.response.data

		if (code === 'A0230') { // token过期
			uni.showToast({
				title: '会话已过期，请重新登录',
				success() {
					uni.navigateTo({
						url: `/pages/login/login`,
					});
				}
			})
		} else {
			uni.showToast({
				title: msg,
				icon: 'none'
			});
			return Promise.reject(new Error(msg || 'Errors'))
		}
	}
)

export default service