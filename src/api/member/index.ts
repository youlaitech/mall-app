import { request } from '@/utils/http';

const MEMBER_API_PREFIX = '/mall-ums/app-api/v1';

import { MemberInfo } from './types';

/** 获取会员信息 */
export function getMemberInfo() {
    return request.Get<MemberInfo>(MEMBER_API_PREFIX + '/members/me');
}

export function getAddressList(memberId: number) {
    return request.Get(MEMBER_API_PREFIX + '/addresses', { params: { memberId: memberId } });
}

export function addAddress(data) {
    return request.Post(MEMBER_API_PREFIX + '/addresses', data);
}

export function updateAddress(id: number, data) {
    return request.Put(MEMBER_API_PREFIX + '/addresses/' + id, data);
}
