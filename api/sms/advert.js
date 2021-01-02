
import request from '@/utils/request'

export function getAdvertList() {
  return request({
    url: '/mall-sms/api.app/v1/adverts',
    method: 'get'
  })
}
