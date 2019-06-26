const Mock = require('mockjs')
const URLMapping = require('./urlMapping')

// 管理员角色
const adminRole = function (expireTime) {
  return Mock.mock({
    code: '0000',
    data: {
      token: '@guid',
      expire_time: expireTime
    },
    message: '请求成功'
  })
}

// 测试人员角色
const testRole = function (expireTime) {
  return Mock.mock({
    code: '0000',
    data: {
      token: 'test',
      expire_time: expireTime
    },
    message: '请求成功'
  })
}

const validateUserInfo = function (username, password) {
  const expireTime = new Date().getTime() + 30 * 60 * 1000

  if (username === 'admin' && password === 'admin') {
    return adminRole(expireTime)
  }

  if (username === 'test' && password === 'test') {
    return testRole(expireTime)
  }

  return {
    code: '0001',
    data: {},
    message: '用户名或密码错误'
  }
}

const fun = function (req, res) {
  const username = req.body.userName
  const password = req.body.password
  const resData = validateUserInfo(username, password)

  res.json(resData)
}

module.exports = {
  path: URLMapping.login,
  fun: fun
}
