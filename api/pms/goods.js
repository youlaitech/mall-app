import request from '@/utils/request'

export function getGoodsList(params) {
	return request({
		url: '/mall-pms/app-api/v1/goods',
		method: 'get',
		params: params
	})
}


export function getGoodsById(id) {
	return request({
		url: '/mall-pms/app-api/v1/goods/' + id,
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
