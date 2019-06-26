<template>
  <div class="app-layout login-page">
    <div class="header">
      <div class="lang">
        <span :class="{active: $i18n.locale==='zh-CN'}" @click="changeLang('zhCN')">中</span> |
        <span :class="{active: $i18n.locale==='en'}" @click="changeLang('en')">EN</span>
      </div>
    </div>
    <div class="login-area">
      <div class="login-content">
        <div class="title">{{ $t("loginWelcome") }}</div>
        <a-form :form="form">
          <a-form-item>
            <a-input size="large" v-decorator="['userName', formElement['userName']]" placeholder="admin/test">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input type="password" size="large" v-decorator="['password', formElement['password']]" placeholder="admin/test">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button size="large" type="primary" block @click="goPage">{{ $t("login") }}</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    // 注意，想要绑定到data中的国际化内容需要在computed中进行
    formElement () {
      return {
        'userName': {
          rules: [
            {
              required: true,
              message: this.$t('validate.requireInput', {
                label: this.$t('userName')
              })
            }
          ]
        },
        'password': {
          rules: [
            {
              required: true,
              message: this.$t('validate.requireInput', {
                label: this.$t('password')
              })
            }
          ]
        }
      }
    }
  },
  methods: {
    changeLang (lang) {
      this.$store.commit('setLang', lang)
      this.form.resetFields()
    },
    goPage () {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 请注意，默认情况下所有的表单值不会去空格，若去空格请调用jsHelpers下的方法
          this.$store.dispatch('user/login', values).then(res => {
            this.$router.push({ name: 'home' })
          })
        }
      })
    }
  }
}
</script>
