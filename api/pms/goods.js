import request from '@/utils/request'

export function getGoodsInfo(id) {
  return request({
    url: '/mall-pms/goods/'+id,
    method: 'get'
  })
}
