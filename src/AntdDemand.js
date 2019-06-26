// 如有必要，可按需加载Ant-design
import Vue from 'vue'
import { Button, Layout } from 'ant-design-vue'

// 组件库
const Components = [
  Button,
  Layout
]

// 注册组件
Components.map((com) => {
  Vue.component(com.name, com)
})
