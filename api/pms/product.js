import request from '@/utils/request'

export function detail(id) {
  return request({
    url: '/mall-pms/api.app/v1/products/'+id,
    method: 'get'
  })
}
