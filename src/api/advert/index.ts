import { request } from '@/utils/http';

import { BannerVO } from './types';

const ADVERT_API_PREFIX = '/mall-sms/app-api/v1/adverts';

/**
 * 获取广告横幅列表
 *
 * @returns
 */
export function getAdvertBannerList() {
    return request.Get<BannerVO>(ADVERT_API_PREFIX + '/banners');
}
