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

export function logout(){
	return request({
		url: '/youlai-auth/oauth/logout',
		method: 'delete'
	})
}

export function getUserInfo() {
	return request({
		url: '/youlai-mall-ums/members/me',
		method: 'get'
	})
}


