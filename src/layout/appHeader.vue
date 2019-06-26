<template>
  <a-layout-header class="app-header">
    <div class="app-header-right">
      <a-dropdown :trigger="['click']">
        <div class="app-header-action">
          <a-icon type="user"></a-icon>
          <span>{{ userName }}</span>
        </div>
        <a-menu slot="overlay" class="user-menu">
          <a-menu-item key="0">
            <a-icon type="edit"></a-icon>
            <span>{{ $t('editPassword') }}</span>
          </a-menu-item>
          <a-menu-item key="1" @click="logout">
            <a-icon type="logout"></a-icon>
            <span>{{ $t('logout') }}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.name
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout').then(res => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>
