<script setup lang="ts">
const route = useRoute<'hi-id'>()
const user = useUserStore()
const pId = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  layout: 'home',
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl />
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <div text-xl>
      {{ pId }}!
    </div>

    <template v-if="user.otherNames.length">
      <div my-4 text-sm>
        <span op-50>Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
