import { request } from '@/utils/http';

const ORDER_API_PREFIX = '/mall-oms/app-api/v1/carts';

// 查询购物车
export function getCart() {
    return request.Get(ORDER_API_PREFIX);
}

/**
 * 全选/全不选
 * @param {Object} params
 */
export function checkAll(params) {
    return request.Patch(ORDER_API_PREFIX + '/checkAll', params);
}

// 清空购物车
export function deleteCart() {
    return request.Delete(ORDER_API_PREFIX);
}

// 添加购物车
export function addCartItem(skuId) {
    return request.Post(ORDER_API_PREFIX + '/skuId/' + skuId);
}

// 更新购物车商品
export function updateCartItem(skuId, data) {
    return request.Put(ORDER_API_PREFIX + '/skuId/' + skuId, data);
}

// 批量删除购物车商品
export function removeCartItem(skuId) {
    return request.Delete(ORDER_API_PREFIX + '/skuId/' + skuId);
}
