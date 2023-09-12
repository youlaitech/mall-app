import request from '@/utils/request'

// 订单列表
export function listOrdersWithPage(params) {
	return request({
		url: '/mall-oms/api/v1/orders',
		method: 'get',
		params: params,
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 订单确认
export function confirm(skuId) {
	return request({
		url: '/mall-oms/app-api/v1/orders/confirm',
		method: 'post',
		params: {
			skuId: skuId
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 订单提交
export function submit(data) {
	return request({
		url: '/mall-oms/app-api/v1/orders/submit',
		method: 'post',
		data: data,
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 订单支付
export function pay(data) {
	return request({
		url: '/mall-oms/app-api/v1/orders/payment',
		method: 'post',
		data:data,
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 取消订单
export function cancelOrder(orderId) {
	return request({
		url: '/mall-oms/app-api/v1/orders/cancel',
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
		url: '/mall-oms/app-api/v1/orders/' + orderId,
		method: 'delete',
		headers: {
			'auth': true // 需要认证
		}
	})
}
