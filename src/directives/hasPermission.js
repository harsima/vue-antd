import Vue from 'vue'

const hasPermission = Vue.directive('hasPermission', {
  inserted (el, binding, vnode) {
    let permissionList = vnode.context.$route.meta.permission
    if (!permissionList) {
      console.error(`权限判断不生效。因路由中不包含permission字段，请检查路由表设置。当前路由地址：${vnode.context.$route.path}`)
      return
    }
    if (permissionList && !permissionList.includes(binding.value)) {
      (el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
    }
  }
})

export default hasPermission
