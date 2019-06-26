/**
 * 注册全局事件
 * 注意，大部分事件请在vue组件销毁时同时取消监听，少数事件才需进行全局注册
 */

/* eslint-disable */
import Vue from 'vue'

Vue.nextTick(() => {
  const $body = document.body
  const scrollHeight = $body.scrollHeight

  window.addEventListener('resize', function () {
    // do some thing
  })
})
