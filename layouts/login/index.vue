<script lang='ts' setup>
import LoginHeader from '../components/loginHeader.vue'
</script>

<template>
  <div class="relative h-full w-full">
    <LoginHeader />
    <slot />
  </div>
</template>

<style lang='scss' scoped>

</style>
