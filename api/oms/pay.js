import request from '@/utils/request'


// 查询购物车
export function payInfo(orderId) {
	return request({
		url: '/mall-oms/api.app/v1/order/pay/info',
		method: 'get',
		params: {
			orderId:orderId
		},
		headers: {
			'auth': true // 需要认证
		}
	})
}

// 支付
export function doPay(payForm) {
	return request({
		url: '/mall-oms/api.app/v1/order/pay',
		method: 'post',
		data: payForm,
		headers: {
			'auth': true // 需要认证
		}
	})
}



