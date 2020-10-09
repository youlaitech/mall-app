/**
 * 用户相关api
 */
import request from '@/utils/request'


<<<<<<< HEAD
export function login(data) {
  return request({
    url: '/youlai-auth/oauth/token',
    method: 'post',
    params: data
  })
=======
export const login = (data) => {
	return http.post('/youlai-auth/oauth/token',
		data
	)
>>>>>>> 6adb072c975a2d1ad49477ca877fecd11d37838c
}
