import request from '@/utils/request'

export function list(id) {
  return request({
    url: '/mall-pms/api.app/v1/categories',
    method: 'get'
  })
}
