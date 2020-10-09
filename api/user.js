/**
 * 用户相关api
 */
import {
	http
} from '@/api/service.js'

export const getUserInfo = (params) => {
	return http.get('/youlai-auth/oauth/getUserInfo', {
		params
	})
}

export const login = (data) => {
	return http.post('/youlai-auth/oauth/token',
		data
	)
}
