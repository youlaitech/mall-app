import request from '@/utils/request'

export function list(params) {
	return request({
		url: '/mall-pms/api.app/v1/products',
		method: 'get',
		params: params
	})
}


export function detail(id) {
	return request({
		url: '/mall-pms/api.app/v1/products/' + id,
		method: 'get'
	})
}
