<template>
  <a-layout class="app-layout">
    <app-sider></app-sider>
    <a-layout>
      <app-header></app-header>
      <a-layout-content class="app-content">
        <a-spin size="large" :delay="500" :spinning="showPageLoading">
          <router-view></router-view>
        </a-spin>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import AppSider from './appSider'
import AppHeader from './appHeader'
// import AppContent from './appContent'

export default {
  computed: {
    showPageLoading () {
      return this.$store.state.pageLoading
    }
  },
  components: {
    AppSider,
    AppHeader
    // AppContent
  }
}
</script>
