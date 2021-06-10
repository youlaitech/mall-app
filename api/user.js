/**
 * 用户相关api
 */
import request from '@/utils/request'

export function login(code, rawData) {
	return request({
		url: '/youlai-auth/oauth/token/' + code,
		method: 'post',
		data: rawData
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
