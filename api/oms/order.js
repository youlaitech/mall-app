import request from '@/utils/request'


// 确认订单
export function confirm(skuId,number) {
	return request({
		url: '/mall-oms/api.app/v1/orders/confirm',
		method: 'post',
		params: {
			skuId: skuId,
			number: number
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 提交订单
export function submit(data) {
	return request({
		url: '/mall-oms/api.app/v1/orders/submit',
		method: 'post',
		data: data,
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
			'auth': true // 需要认证
		}
	})
}

// 修改购物车商品数量
export function update(data) {
	return request({
		url: '/mall-oms/api.app/v1/carts',
		method: 'put',
		data: data,
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 是否选择购物车中商品
export function checkItem(data) {
	return request({
		url: '/mall-oms/api.app/v1/carts/check',
		method: 'put',
		data: data,
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 是否选择购物车中商品
export function checkAll(check) {
	return request({
		url: '/mall-oms/api.app/v1/carts/checkAll',
		method: 'put',
		params: {
			check: check
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 删除购物车中选中商品
export function deleteCart(skuIds) {
	return request({
		url: '/mall-oms/api.app/v1/carts',
		method: 'delete',
		params: {
			skuIds: skuIds
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 删除购物车中选中商品
export function clear(skuIds) {
	return request({
		url: '/mall-oms/api.app/v1/carts/clear',
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}
