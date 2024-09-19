<script lang='ts' setup>
import LoginHeader from '../components/loginHeader.vue'
</script>

<template>
  <div class="visual-effects relative h-full w-full overflow-hidden">
    <LoginHeader />
    <slot />
    <div
      class="bottom-bar fixed h-100px animate-name-gradient animate-duration-2000 animate-count-infinite blur-100 -bottom-50px -left-50px -right-50px"
    />
  </div>
</template>

<style lang='scss' scoped>
.bottom-bar {
  background: repeating-linear-gradient(90deg, #36e4da 0, #1de0b1 25%, #00dc82 50%, #1de0b1 75%, #36e4da);
  background-size: 200% auto;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  background-position: 0 0;
}

@keyframes gradient {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -200% 0;
  }
}
</style>
