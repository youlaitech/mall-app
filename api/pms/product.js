import request from '@/utils/request'

export function list(params) {
	return request({
		url: '/mall-pms/app-api/v1/products',
		method: 'get',
		params: params
	})
}


export function detail(id) {
	return request({
		url: '/mall-pms/app-api/v1/products/' + id,
		method: 'get'
	})
}


/**
 * 获取商品库存
 */
export function getSkuStock(skuId) {
	return request({
		url: '/mall-pms/app-api/v1/skus/' + skuId + '/stock',
		method: 'get'
	})
}
