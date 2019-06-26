import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/store'
import Auth from '../utils/auth'

import { basicRouter, layoutRouter } from './basicRouter'
import permissionRoutes from './permissionRouter'
import whiteList from './whiteList'

import { message } from 'ant-design-vue'

// 生成路由信息
function generator (routerMap) {
  return routerMap.map(item => {
    const currentRouterMeta = {}
    for (const me in item) {
      if (me !== 'name' && me !== 'path') {
        currentRouterMeta[me] = item[me]
      }
    }

    const currentRouter = {
      name: item.name,
      path: item.path,
      component: permissionRoutes[item.name],
      meta: currentRouterMeta
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length) {
      currentRouter.children = generator(item.children)
    }
    return currentRouter
  })
}

Vue.use(Router)

// 创建router实例
const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: basicRouter
})

// 重置router
const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const router = createRouter()

router.beforeEach((to, from, next) => {
  Store.commit('setPageLoading', true)
  // 如果用户已经登录
  if (Auth.getToken()) {
    const asyncRouter = router.getMatchedComponents('/content')

    if (asyncRouter.length) {
      if (to.path !== '/login') {
        next()
      } else {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页/或跳转到异步路由中的第一个
        // 这种情况出现在手动修改地址栏地址时
        next({
          name: 'home',
          replace: true
        })
        Store.commit('setPageLoading', false)
      }
    } else {
      Store.dispatch('user/getUserInfo').then(res => {
        const permission = res.permission
        const asyncRouter = generator(permission)
        layoutRouter.children = asyncRouter
        router.addRoutes([layoutRouter])
        // 注意不可将异步路由添加到options中，其会影响异步路由的重置，绝对不要打开
        // router.options.routes.push([layoutRouter])
        Store.commit('user/setPermissionList', asyncRouter)
        next({ ...to, replace: true })
      }).catch(err => {
        console.log(err)
        message.warning('获取用户信息失败，请重新登录')
        Store.dispatch('user/logout').then(() => {
          next({
            name: 'login',
            replace: true
          })
        })
      })
    }
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({
        name: 'login',
        replace: true
      })
      Store.commit('setPageLoading', false)
    }
  }
})

router.afterEach(() => {
  Store.commit('setPageLoading', false)
})

export { resetRouter }

export default router
