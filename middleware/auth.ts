import { defineNuxtRouteMiddleware, navigateTo, useCookie, useRoute } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token')
  const route = useRoute()

  // 未登录
  if (!token.value) {
    return navigateTo(`/login?from=${route.fullPath}`)
  }
})
