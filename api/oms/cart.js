import request from '@/utils/request'


// 查询购物车
export function getCart() {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}

/**
 * 全选/全不选
 * @param {Object} params
 */
export function checkAll(params) {
	return request({
		url: '/mall-oms/app-api/v1/carts/_check',
		method: 'patch',
		params: params,
		headers: {
			'auth': true
		}
	})
}


// 清空购物车
export function deleteCart() {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'delete',
		headers: {
			'auth': true
		}
	})
}


// 添加购物车
export function addCartItem(skuId) {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'post',
		params: {
			skuId: skuId
		},
		headers: {
			'auth': true
		}
	})
}

// 更新购物车商品
export function updateCartItem(skuId, data) {
	return request({
		url: '/mall-oms/app-api/v1/carts/skuId/' + skuId,
		method: 'put',
		data: data,
		headers: {
			'auth': true
		}
	})
}


// 批量删除购物车商品
export function removeCartItem(skuId) {
	return request({
		url: '/mall-oms/app-api/v1/carts/skuId/' + skuId,
		method: 'delete',
		headers: {
			'auth': true
		}
	})
}
