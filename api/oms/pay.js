import request from '@/utils/request'


// 查询购物车
export function getPayment(orderId) {
	return request({
		url: '/mall-oms/api.app/v1/payments/orderId/' + orderId,
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 支付
export function pay(orderId, payType) {
	return request({
		url: '/mall-oms/api.app/v1/payments',
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
