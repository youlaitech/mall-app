import { request } from '@/utils/http';

const PRODUCT_API_PREFIX = '/mall-pms/app-api/v1';

/**
 * 获取商品分页列表
 *
 * @param {Object} params
 */
export function listSpuPages(params) {
    return request.Get(PRODUCT_API_PREFIX + '/spu/page', { params: params });
}

/**
 * 获取秒杀商品列表
 *
 * @param {Object} params
 */
export function listSeckillingSpus() {
    return request.Get(PRODUCT_API_PREFIX + '/spu/seckilling');
}

/**
 * 获取商品详情
 *
 * @param {Object} spuId
 */
export function getSpuDetail(spuId) {
    return request.Get(PRODUCT_API_PREFIX + '/spu/' + spuId);
}

/**
 * 获取商品分类列表
 *
 * @param parentId
 * @returns
 */
export function getCategoryList(parentId) {
    return request.Get(PRODUCT_API_PREFIX + '/category', { params: { parentId: parentId } });
}
