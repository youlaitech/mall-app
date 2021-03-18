import request from '@/utils/request'


// 确认订单
export function confirm(skuId,number) {
	return request({
		url: '/mall-oms/api.app/v1/orders/_confirm',
		method: 'post',
		data: {
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
		url: '/mall-oms/api.app/v1/orders/_submit',
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

// 取消订单
export function orderList(state) {
	return request({
		url: '/mall-oms/api.app/v1/orders/list',
		method: 'get',
		params: {
			state: state
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 取消订单
export function cancelOrder(orderId) {
	return request({
		url: '/mall-oms/api.app/v1/orders/cancel',
		method: 'put',
		params: {
			id: orderId
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 删除订单
export function deleteOrder(orderId) {
	return request({
		url: '/mall-oms/api.app/v1/orders',
		method: 'delete',
		params: {
			id: orderId
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 查询订单列表
export function orderPage(status) {
	return request({
		url: '/mall-oms/api.app/v1/orders/list',
		method: 'get',
		params: {
			status: status
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}
