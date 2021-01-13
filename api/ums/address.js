import request from '@/utils/request'

export function list() {
	return request({
		url: '/mall-ums/api.app/v1/addresses',
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}


export function add(data) {
	return request({
		url: '/mall-ums/api.app/v1/addresses',
		method: 'post',
		data: data
	})
}


export function update(id,data) {
	return request({
		url: '/mall-ums/api.app/v1/addresses/'+id,
		method: 'put',
		data: data
	})
}