/**
 * 用户相关api
 */
import request from '@/utils/request'

export function login(code, userInfo) {
	return request({
		url: '/youlai-auth/oauth/token',
		method:'post',
		params: {code:code,userInfo:userInfo,grant_type:'wechat'},
		headers: {
			'Authorization': 'Basic eW91bGFpLW1hbGwtd2VhcHA6MTIzNDU2' // 客户端信息加密摘要认证，明文：youlai-mall-weapp:123456
		}
	})
}

export function logout() {
	return request({
		url: '/youlai-auth/oauth/logout',
		method: 'delete',
		headers: {
			'auth': true // 需要认证
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
