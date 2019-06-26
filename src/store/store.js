import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '../lang/i18n'

import modules from './modules'

Vue.use(Vuex)

const state = {
  lang: '',
  pageLoading: false
}

const mutations = {
  setLang (state, lang) {
    localStorage.setItem(process.env.VUE_APP_LANG_KEY, lang)
    i18n.locale = lang
    state.lang = lang
  },
  setPageLoading (state, data) {
    state.pageLoading = data
  }
}

const actions = {
  getLang () {
    return new Promise((resolve) => {
      let lang = localStorage.getItem(process.env.VUE_APP_LANG_KEY)
      if (!lang) {
        lang = process.env.VUE_APP_I18N_LOCALE
      }
      resolve(lang)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})
