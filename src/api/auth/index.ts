import { request } from '@/utils/http';
import { LoginData, LoginResult } from './types';
import { ContentTypeEnum } from '@/enums/httpEnum';

/**
 * 登录
 * @param params
 */
export function login(data: LoginData) {
    data.grant_type = 'sms_code';
    return request.Post<LoginResult>('/youlai-auth/oauth2/token', data, {
        headers: {
            Authorization: 'Basic bWFsbC1hcHA6MTIzNDU2',
            'Content-Type': ContentTypeEnum.FORM_URLENCODED,
        },
    });
}

/**
 * 登出
 */
export function logout() {}

/**
 * 刷新token
 */
export function refreshToken() {}
