import { request } from '@/utils/http';

const ORDER_API_PREFIX = '/mall-oms/app-api/v1/adverts';

export function getAdvertList() {
    return request.Get(ORDER_API_PREFIX);
}
