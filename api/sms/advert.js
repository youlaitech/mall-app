
import request from '@/utils/request'

export function getAdvertList() {
  return request({
    url: '/mall-sms/app-api/v1/adverts/banners',
    method: 'get'
  })
}
