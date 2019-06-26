<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Auth from './utils/auth'

export default {
  name: 'app',
  data () {
    return {
      zhCN
    }
  },
  computed: {
    locale () {
      let lang = this.$store.state.lang
      let res
      switch (lang) {
        case 'zhCN':
          moment.locale('zh-cn')
          res = zhCN
          break
        default:
          moment.locale('en')
          res = null
      }
      return res
    }
  },
  mounted () {
    const token = Auth.getToken()
    this.$store.dispatch('getLang').then(res => {
      this.$store.commit('setLang', res)
    })
    if (token) {
      this.$store.commit('user/setToken', token)
    }
  }
}
</script>
