// 基础路由集
import PageLayout from '../layout/pageLayout.vue'
import Login from '../pages/login/login.vue'

// 基本路由信息
const basicRouter = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/error',
    component: PageLayout,
    children: [
      {
        path: '404',
        name: '404'
      },
      {
        path: '403',
        name: '403'
      },
      {
        path: '401',
        name: '401'
      }
    ]
  }
]

// 内容路由信息
const layoutRouter = {
  path: '/content',
  component: PageLayout,
  children: []
}

export {
  basicRouter,
  layoutRouter
}
