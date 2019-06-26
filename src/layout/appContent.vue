<template>
  <a-layout-content class="app-content">
    <a-spin size="large" :delay="500" :spinning="showPageLoading">
      <router-view></router-view>
    </a-spin>
  </a-layout-content>
</template>

<script>
export default {
  computed: {
    showPageLoading () {
      return this.$store.state.pageLoading
    }
  }
}
</script>
