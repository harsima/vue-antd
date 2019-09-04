<template>
  <div class="page-section">
    <a-divider orientation="left">{{ title }}</a-divider>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
