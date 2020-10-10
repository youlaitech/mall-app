/**
 * 用户相关api
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/youlai-auth/oauth/token',
    method: 'post',
    params: data
  })
}
