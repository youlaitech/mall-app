/**
 * 用户相关api
 */
import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/youlai-auth/oauth/token',
		method: 'post',
		params: data
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
		url: '/youlai-mall-ums/members/me',
		method: 'get',
		headers:{
			'auth':true
		}
	})
}
