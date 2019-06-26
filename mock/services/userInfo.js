const Mock = require('mockjs')
const URLMapping = require('./urlMapping')

/**
 * 设置当前用户权限
 * 菜单结构
 * @property {string} name        required   页面唯一key，不可重复。必须和前端路由表匹配，前端根据该值进行路由匹配
 * @property {string} path        required   页面地址
 * @property {string} icon                   菜单对应的图标类。注意对应的图标必须在前端已注册，或者返回对应图片的base64编码
 * @property {string} target                 页面打开方式，默认不需要配置，当有该字段时页面会进行刷新加载
 *                                           枚举类型，同html中的target，可选值：[_blank, _self, _parent, _top]
 * @property {string} title       required   页面显示的名称
 * @property {string} hidden                 页面是否隐藏
 * @property {array}  permission             页面对应的下属权限，如按钮权限
 * @property {array}  children               子页面
 * {
 *   name: '',
 *   path: '',
 *   icon: '',
 *   target: '',
 *   title: '',
 *   hidden: '',
 *   permission: []
 *   children: []
 * }
 */

// 管理员权限
const adminPermission = [
  {
    name: 'home',
    path: '/home',
    title: '首页'
  },
  {
    name: 'form',
    path: '/form',
    title: '表单页'
  },
  {
    name: 'table',
    path: '/table',
    title: '表格页'
  }
]

// 测试人员权限
const testPermission = [
  {
    name: 'home',
    path: '/home',
    title: '首页'
  }
]

// 校验用户角色
const validateUserRole = function (token) {
  if (token === 'test') {
    return testPermission
  }
  return adminPermission
}

const fun = function (req, res) {
  const permissionList = validateUserRole(req.get('token'))

  const resData = Mock.mock({
    code: '0000',
    data: {
      name: '@cname',
      permission: permissionList
    },
    message: '请求成功'
  })

  res.json(resData)
}

module.exports = {
  path: URLMapping.getUserInfo,
  fun: fun
}
