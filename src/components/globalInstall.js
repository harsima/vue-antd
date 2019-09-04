import Vue from 'vue'
import PageMain from './Layout/PageMain.vue'
import PageSection from './Sections/PageSection.vue'

// 组件库
const Components = [
  PageMain,
  PageSection
]

// 注册全局组件
Components.map((com) => {
  Vue.component(com.name, com)
})
