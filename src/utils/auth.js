import Cookies from 'js-cookie'

/**
 * 设置Token
 * @param {String} token
 */
const setToken = function (token, expire) {
  var maxAge = new Date(expire) || new Date(new Date().getTime() + Number(process.env.VUE_APP_TOKEN_EXPIRETIME))
  Cookies.set(process.env.VUE_APP_TOKEN_KEY, token, {
    expires: maxAge
  })
}

/**
 * 获取Token
 */
const getToken = function () {
  return Cookies.get(process.env.VUE_APP_TOKEN_KEY)
}

/**
 * 删除Token
 */
const removeToken = function () {
  Cookies.remove(process.env.VUE_APP_TOKEN_KEY)
}

export default {
  setToken,
  getToken,
  removeToken
}
