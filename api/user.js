/**
 * 用户相关api
 */
import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/youlai-auth/oauth/token',
		method: 'post',
		params: data,
		headers: {
			'Authorization': 'Basic eW91bGFpLXdlYXBwOjEyMzQ1Ng==' // 客户端信息加密摘要认证，明文：youlai-weapp:123456
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
		headers:{
			'auth':true
		}
	})
}
