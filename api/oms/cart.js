import request from '@/utils/request'


// 查询购物车
export function detail() {
	return request({
		url: '/mall-oms/api.app/v1/carts',
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 添加购物车
export function save(skuId) {
	return request({
		url: '/mall-oms/api.app/v1/carts',
		method: 'post',
		params: {
			skuId: skuId
		},
		headers: {
			'auth': true
		}
	})
}

/**
 * 局部更新购物车商品
 * @param {Object} params
 */
export function updateCartItem(skuId, params) {
	return request({
		url: '/mall-oms/api.app/v1/carts/skuId/' + skuId,
		method: 'put',
		params: params,
		headers: {
			'auth': true
		}
	})
}


/**
 * 批量局部更新购物车商品
 * @param {Object} params
 */
export function batchUpdateCartItem(params) {
	return request({
		url: '/mall-oms/api.app/v1/carts/batch',
		method: 'put',
		params: params,
		headers: {
			'auth': true
		}
	})
}

// 批量删除购物车商品
export function deleteCartItem(skuId) {
	return request({
		url: '/mall-oms/api.app/v1/carts/skuId/' + skuId,
		method: 'delete',
		headers: {
			'auth': true
		}
	})
}

// 删除购物车中选中商品
export function deleteCart() {
	return request({
		url: '/mall-oms/api.app/v1/carts',
		method: 'delete',
		headers: {
			'auth': true
		}
	})
}
