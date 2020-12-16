import request from '@/utils/request'

export function detail(id) {
  return request({
    url: '/mall-pms/products/'+id,
    method: 'get'
  })
}
