<template>
  <a-layout-sider class="app-layout-sider">
    <div class="app-logo">Vue-Antd</div>
    <sider-menu :menuData="menuData" :collapsed="false" @select="onSelect"></sider-menu>
  </a-layout-sider>
</template>

<script>
import SiderMenu from '../components/Menu/menu'

export default {
  computed: {
    menuData () {
      return this.$store.state.user.permissionList
    }
  },
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onSelect () {
      this.toggleCollapse()
    }
  },
  components: {
    SiderMenu
  }
}
</script>
