// 权限路由集
import Home from '../pages/home/home.vue'

const asyncRouter = {
  home: Home,
  form: () => import(/* webpackChunkName: 'form' */ '../pages/form/form'),
  table: () => import(/* webpackChunkName: 'table' */ '../pages/table/table')
}

export default asyncRouter
