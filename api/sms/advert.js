/**
 * 广告api
 */
import request from '@/utils/request'

export function getAdvertList() {
  return request({
    url: '/youlai-mall-sms/adverts',
    method: 'get'
  })
}
