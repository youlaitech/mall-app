import request from '@/utils/request'


// 查询购物车
export function getPayInfo(orderId) {
	return request({
		url: '/mall-oms/api.app/v1/order_pays/orderId/' + orderId,
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 支付
export function pay(orderId, payType) {
	return request({
		url: '/mall-oms/api.app/v1/order_pays',
		method: 'post',
		params: {
			orderId: orderId,
			payType: payType
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}
