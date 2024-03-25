import { request } from '@/utils/http';

const ORDER_API_PREFIX = '/mall-oms/app-api/v1';

/** 订单列表 */
export function getOrderPage(params) {
    return request.Get(ORDER_API_PREFIX + '/orders', { params: params });
}

/** 订单确认 */
export function confirmOrder(skuId) {
    return request.Post(ORDER_API_PREFIX + '/orders/confirm', { skuId: skuId });
}

/** 订单提交 */
export function submitOrder(data) {
    return request.Post(ORDER_API_PREFIX + '/orders', data);
}

/** 订单支付 */
export function payOrder(data) {
    return request.Post(ORDER_API_PREFIX + '/orders/pay', data);
}

/** 取消订单 */
export function cancelOrder(orderId) {
    return request.Put(ORDER_API_PREFIX + '/orders/' + orderId + '/cancel');
}

/** 删除订单  */
export function deleteOrder(orderId) {
    return request.Delete(ORDER_API_PREFIX + '/orders/' + orderId);
}
