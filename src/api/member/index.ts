import { request } from '@/utils/http';

const MEMBER_API_PREFIX = '/mall-ums/app-api/v1';

export function list(memberId) {
    return request.Get(MEMBER_API_PREFIX + '/addresses');
}

export function add(data) {
    return request.Post(MEMBER_API_PREFIX + '/addresses', data);
}

export function update(id, data) {
    return request.Put(MEMBER_API_PREFIX + '/addresses/' + id, data);
}
