import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import i18n from './lang/i18n.js'
import axios from './ajax/ajax.config'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './components/globalInstall'
import '@/assets/css/index.scss'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  i18n,
  axios,
  render: h => h(App)
}).$mount('#app')
