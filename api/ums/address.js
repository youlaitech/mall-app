import request from '@/utils/request'

export function list(memberId) {
	return request({
		url: '/mall-ums/app-api/v1/addresses',
		method: 'get',
		params: {
			memberId: memberId
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}


export function add(data) {
	return request({
		url: '/mall-ums/app-api/v1/addresses',
		method: 'post',
		data: data,
		headers: {
			'auth': true // 需要认证
		}
	})
}


export function update(id, data) {
	return request({
		url: '/mall-ums/app-api/v1/addresses/' + id,
		method: 'put',
		data: data,
		headers: {
			'auth': true // 需要认证
		}
	})
}
