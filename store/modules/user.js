import { login , getUserInfo , logout } from '@/api/user'

const state = {
  hasLogin:false,
  nickname: '',
  avatar: ''
}

const mutations = {
  SET_HAS_LOGIN:(state,hasLogin) =>{
	state.hasLogin=hasLogin  
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // login
  login({commit}, data) {
    const {code, encryptedData,iv} = data
    return new Promise((resolve, reject) => {
      login({
        grant_type: 'password',
        code: code,
        encryptedData: encryptedData,
        iv: iv
      }).then(response => {
        const {access_token, token_type } = response
		const token = token_type + " " +access_token
		uni.setStorageSync('token',token)
		commit('SET_HAS_LOGIN', true)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const {data} = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {nickname, avatar} = data
        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state,}) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
		 uni.removeStorage({
			key: 'userInfo'
		 })
		 uni.removeStorage({
			key: 'token'
		 })
		 commit('SET_HAS_LOGIN', false)
		 commit('SET_NICKNAME', '')
		 commit('SET_AVATAR', '')
		resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
