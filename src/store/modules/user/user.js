import axios from '@/ajax/ajax.config'
import AjaxURL from '@/ajax/ajaxUrlMapping'
import Auth from '@/utils/auth'
import { resetRouter } from '@/router/router'

const state = {
  token: '',
  name: '',
  permissionList: []
}

const mutations = {
  setName: (state, data) => {
    state.name = data
  },
  setToken: (state, data) => {
    state.token = data
  },
  setPermissionList: (state, data) => {
    state.permissionList = data
  }
}

const actions = {
  // 登录
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      axios.post(AjaxURL.login, userInfo).then(res => {
        const data = res.data
        commit('setToken', data.token)
        Auth.setToken(data.token, data.expire_time)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 登出
  logout ({ commit }) {
    return new Promise((resolve) => {
      commit('setName', '')
      commit('setToken', '')
      commit('setPermissionList', [])
      resetRouter()
      Auth.removeToken()
      resolve()
    })
  },

  // 获取用户信息
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(AjaxURL.getUserInfo).then(res => {
        const data = res.data
        commit('setName', data.name)
        resolve(data)
      }).catch(err => {
        console.log(err)
        reject(err)
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
