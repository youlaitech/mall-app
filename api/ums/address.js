
import request from '@/utils/request'

export function list() {
  return request({
    url: '/mall-ums/api.app/v1/addresses',
    method: 'get',
	headers: {
		'auth': true // 需要认证
	}
  })
}
