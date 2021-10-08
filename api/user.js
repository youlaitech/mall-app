/**
 * 用户相关api
 */
import request from '@/utils/request'

// 小程序登录
// #ifdef MP
export function login(code, encryptedData,iv) {
	return request({
		url: '/youlai-auth/oauth/token',
		method: 'post',
		params: {
			code: code,
			encryptedData: encryptedData,
			iv:iv,
			grant_type: 'wechat'
		},
		headers: {
			'Authorization': 'Basic bWFsbC13ZWFwcDoxMjM0NTY=' // 客户端信息加密摘要认证，明文：mall-weapp:123456
		}
	})
}
// #endif

// H5、Android、IOS 手机验证码登录
// #ifndef MP
export function login( mobile,code) {
	console.log('login',code)
	return request({
		url: '/youlai-auth/oauth/token',
		method: 'post',
		params: {
			code: code,
			mobile: mobile,
			grant_type: 'sms_code'
		},
		headers: {
			'Authorization': 'Basic bWFsbC1hcHA6MTIzNDU2' // 客户端信息加密摘要认证，明文：mall-app:123456
		}
	})
}
// #endif



export function logout() {
	return request({
		url: '/youlai-auth/oauth/logout',
		method: 'delete',
		headers: {
			'auth': true // 需要认证，通过
		}
	})
}

export function getUserInfo() {
	return request({
		url: '/mall-ums/app-api/v1/members/me',
		method: 'get',
		headers: {
			'auth': true
		}
	})
}

export function sendSmsCode(phoneNumber) {
	return request({
		url: '/youlai-admin/api/v1/sms/code',
		method: 'post',
		params: {
			phoneNumber: phoneNumber
		}
	})
}
