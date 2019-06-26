const Login = require('./login')
const UserInfo = require('./userInfo')

module.exports = function (app) {
  app.post(Login.path, Login.fun)
  app.get(UserInfo.path, UserInfo.fun)
}
