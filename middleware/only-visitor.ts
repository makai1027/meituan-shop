import { defineNuxtRouteMiddleware, useCookie } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token')
  // 已登录，强制重定向到首页
  if (token.value) {
    return '/'
  }
})
